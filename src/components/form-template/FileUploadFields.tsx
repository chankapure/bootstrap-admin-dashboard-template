import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileType, Video, Crop, ZoomIn, ZoomOut, Move, Check, X } from 'lucide-react';
import { Image as LucideImage } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface FilePreviewProps {
  file: File | null;
  type: 'document' | 'image' | 'video';
}

const FilePreview = ({ file, type }: FilePreviewProps) => {
  if (!file) return null;
  
  if (type === 'image') {
    return (
      <div className="mt-2">
        <img 
          src={URL.createObjectURL(file)} 
          alt="Preview" 
          className="max-w-full h-auto max-h-[200px] rounded-md"
        />
      </div>
    );
  }
  
  if (type === 'video') {
    return (
      <div className="mt-2">
        <video 
          src={URL.createObjectURL(file)} 
          controls 
          className="max-w-full h-auto max-h-[200px] rounded-md"
        />
      </div>
    );
  }
  
  return (
    <div className="mt-2 p-4 border border-border rounded-md flex items-center gap-2">
      <FileType size={24} />
      <span>{file.name}</span>
    </div>
  );
};

interface CropAreaProps {
  imageUrl: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

const CropArea = ({ imageUrl, onCrop, onCancel }: CropAreaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cropPosition, setCropPosition] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveStartPos, setMoveStartPos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [cropShape, setCropShape] = useState<'square' | 'circle'>('square');
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  React.useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      imgRef.current = img;
      
      const size = Math.min(img.width, img.height) / 2;
      const startX = (img.width - size) / 2;
      const startY = (img.height - size) / 2;
      setCropPosition({ 
        startX, 
        startY, 
        endX: startX + size, 
        endY: startY + size 
      });
      
      drawCropArea(ctx, { startX, startY, endX: startX + size, endY: startY + size });
      updatePreview({ startX, startY, endX: startX + size, endY: startY + size });
    };
  }, [imageUrl]);
  
  const drawCropArea = (ctx: CanvasRenderingContext2D, pos: typeof cropPosition) => {
    if (!canvasRef.current || !imgRef.current) return;
    
    const { startX, startY, endX, endY } = pos;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(imgRef.current, 0, 0);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    ctx.globalCompositeOperation = 'destination-out';
    
    if (cropShape === 'circle') {
      const radius = Math.abs(endX - startX) / 2;
      const centerX = startX + radius;
      const centerY = startY + radius;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(startX, startY, endX - startX, endY - startY);
    }
    
    ctx.globalCompositeOperation = 'source-over';
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    if (cropShape === 'circle') {
      const radius = Math.abs(endX - startX) / 2;
      const centerX = startX + radius;
      const centerY = startY + radius;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    }
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    
    if (cropShape === 'square') {
      const thirdHeight = (endY - startY) / 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY + thirdHeight);
      ctx.lineTo(endX, startY + thirdHeight);
      ctx.moveTo(startX, startY + 2 * thirdHeight);
      ctx.lineTo(endX, startY + 2 * thirdHeight);
      
      const thirdWidth = (endX - startX) / 3;
      ctx.moveTo(startX + thirdWidth, startY);
      ctx.lineTo(startX + thirdWidth, endY);
      ctx.moveTo(startX + 2 * thirdWidth, startY);
      ctx.lineTo(startX + 2 * thirdWidth, endY);
      ctx.stroke();
    }
    
    ctx.fillStyle = '#3b82f6';
    const handleSize = 10;
    
    if (cropShape === 'square') {
      ctx.fillRect(startX - handleSize/2, startY - handleSize/2, handleSize, handleSize);
      ctx.fillRect(endX - handleSize/2, startY - handleSize/2, handleSize, handleSize);
      ctx.fillRect(startX - handleSize/2, endY - handleSize/2, handleSize, handleSize);
      ctx.fillRect(endX - handleSize/2, endY - handleSize/2, handleSize, handleSize);
    }
  };
  
  const updatePreview = (pos: typeof cropPosition) => {
    if (!previewCanvasRef.current || !imgRef.current) return;
    
    const { startX, startY, endX, endY } = pos;
    const previewCtx = previewCanvasRef.current.getContext('2d');
    if (!previewCtx) return;
    
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    previewCanvasRef.current.width = width;
    previewCanvasRef.current.height = height;
    
    previewCtx.drawImage(
      imgRef.current,
      Math.min(startX, endX),
      Math.min(startY, endY),
      width,
      height,
      0, 0, width, height
    );
    
    if (cropShape === 'circle') {
      previewCtx.globalCompositeOperation = 'destination-in';
      previewCtx.beginPath();
      previewCtx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      previewCtx.fill();
      previewCtx.globalCompositeOperation = 'source-over';
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    if (
      x >= cropPosition.startX && 
      x <= cropPosition.endX && 
      y >= cropPosition.startY && 
      y <= cropPosition.endY
    ) {
      setIsMoving(true);
      setMoveStartPos({ x, y });
    } else {
      setIsDragging(true);
      setCropPosition({ ...cropPosition, startX: x, startY: y, endX: x, endY: y });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || (!isDragging && !isMoving)) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    if (isMoving) {
      const deltaX = x - moveStartPos.x;
      const deltaY = y - moveStartPos.y;
      
      const width = cropPosition.endX - cropPosition.startX;
      const height = cropPosition.endY - cropPosition.startY;
      
      let newStartX = cropPosition.startX + deltaX;
      let newStartY = cropPosition.startY + deltaY;
      
      if (newStartX < 0) newStartX = 0;
      if (newStartY < 0) newStartY = 0;
      if (newStartX + width > canvas.width) newStartX = canvas.width - width;
      if (newStartY + height > canvas.height) newStartY = canvas.height - height;
      
      const newPos = {
        startX: newStartX,
        startY: newStartY,
        endX: newStartX + width,
        endY: newStartY + height
      };
      
      setCropPosition(newPos);
      setMoveStartPos({ x, y });
      drawCropArea(ctx, newPos);
      updatePreview(newPos);
    } else if (isDragging) {
      const newPos = { ...cropPosition, endX: x, endY: y };
      
      if (cropShape === 'square' || cropShape === 'circle') {
        const width = Math.abs(newPos.endX - newPos.startX);
        const height = Math.abs(newPos.endY - newPos.startY);
        const size = Math.max(width, height);
        
        if (newPos.endX > newPos.startX) {
          newPos.endX = newPos.startX + size;
        } else {
          newPos.endX = newPos.startX - size;
        }
        
        if (newPos.endY > newPos.startY) {
          newPos.endY = newPos.startY + size;
        } else {
          newPos.endY = newPos.startY - size;
        }
        
        if (newPos.endX > canvas.width) newPos.endX = canvas.width;
        if (newPos.endY > canvas.height) newPos.endY = canvas.height;
        if (newPos.endX < 0) newPos.endX = 0;
        if (newPos.endY < 0) newPos.endY = 0;
      }
      
      setCropPosition(newPos);
      drawCropArea(ctx, newPos);
      updatePreview(newPos);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsMoving(false);
  };
  
  const handleZoom = (direction: 'in' | 'out') => {
    if (!canvasRef.current || !imgRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const newZoomLevel = direction === 'in' 
      ? Math.min(zoomLevel + 0.1, 2) 
      : Math.max(zoomLevel - 0.1, 0.5);
    
    setZoomLevel(newZoomLevel);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(newZoomLevel, newZoomLevel);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(imgRef.current, 0, 0);
    ctx.restore();
    
    drawCropArea(ctx, cropPosition);
    updatePreview(cropPosition);
  };
  
  const toggleCropShape = () => {
    const newShape = cropShape === 'square' ? 'circle' : 'square';
    setCropShape(newShape);
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawCropArea(ctx, cropPosition);
        updatePreview(cropPosition);
      }
    }
  };
  
  const handleCrop = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const startX = Math.min(cropPosition.startX, cropPosition.endX);
    const startY = Math.min(cropPosition.startY, cropPosition.endY);
    const width = Math.abs(cropPosition.endX - cropPosition.startX);
    const height = Math.abs(cropPosition.endY - cropPosition.startY);
    
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    
    const croppedCtx = croppedCanvas.getContext('2d');
    if (!croppedCtx) return;
    
    croppedCtx.drawImage(
      imgRef.current!,
      startX, startY, width, height,
      0, 0, width, height
    );
    
    if (cropShape === 'circle') {
      croppedCtx.globalCompositeOperation = 'destination-in';
      croppedCtx.beginPath();
      croppedCtx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      croppedCtx.fill();
      croppedCtx.globalCompositeOperation = 'source-over';
    }
    
    const croppedImageData = croppedCanvas.toDataURL('image/png', 1.0);
    onCrop(croppedImageData);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleZoom('in')}
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleZoom('out')}
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleCropShape}
          title="Toggle Crop Shape"
        >
          {cropShape === 'square' ? 'Circle Crop' : 'Square Crop'}
        </Button>
        <div className="ml-auto flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button 
            size="sm"
            onClick={handleCrop}
          >
            <Check className="h-4 w-4 mr-1" /> Apply Crop
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 border rounded-md overflow-hidden">
          <div className="bg-muted p-2 flex items-center">
            <Move className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm font-medium">Click and drag to adjust</span>
          </div>
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto object-contain cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {cropShape === 'square' ? 'Square Crop' : 'Circle Crop'} | Zoom: {(zoomLevel * 100).toFixed(0)}%
            </div>
          </div>
        </div>
        
        <div className="bg-[#f8f8f8] dark:bg-gray-900 border rounded-md overflow-hidden flex flex-col">
          <div className="bg-muted p-2">
            <span className="text-sm font-medium">Preview</span>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className={`relative ${cropShape === 'circle' ? 'rounded-full overflow-hidden' : ''}`}>
              <canvas 
                ref={previewCanvasRef}
                className="max-w-full max-h-[300px] object-contain shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileUploadFields = () => {
  const { toast } = useToast();
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropShape, setCropShape] = useState<'square' | 'circle'>('square');
  
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  const handleCropImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCropImageUrl(URL.createObjectURL(file));
    }
  };
  
  const handleCropComplete = (croppedImageData: string) => {
    setCroppedImage(croppedImageData);
    setCropImageUrl(null);
    toast({
      title: "Image cropped successfully",
      description: "Your image has been cropped and is ready to use."
    });
  };
  
  const handleCropCancel = () => {
    setCropImageUrl(null);
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
      } else if (file.type.startsWith('video/')) {
        setVideoFile(file);
      } else {
        setDocumentFile(file);
      }
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>
          Upload documents, images, videos with preview support.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="document-upload">Document Upload</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="document-upload"
              type="file"
              onChange={handleDocumentChange}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('document-upload')?.click()}
              className="cursor-pointer"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
            {documentFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {documentFile.name}
              </span>
            )}
          </div>
          <FilePreview file={documentFile} type="document" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image-upload">Image Upload</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="cursor-pointer"
            >
              <LucideImage className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            {imageFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {imageFile.name}
              </span>
            )}
          </div>
          <FilePreview file={imageFile} type="image" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="crop-image-upload">LinkedIn-style Image Crop</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="crop-image-upload"
              type="file"
              accept="image/*"
              onChange={handleCropImageChange}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('crop-image-upload')?.click()}
              className="cursor-pointer"
            >
              <Crop className="mr-2 h-4 w-4" /> Upload & Crop Image
            </Button>
          </div>
          
          {cropImageUrl && (
            <CropArea 
              imageUrl={cropImageUrl}
              onCrop={handleCropComplete}
              onCancel={handleCropCancel}
            />
          )}
          
          {croppedImage && !cropImageUrl && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">Cropped Result:</p>
              <img 
                src={croppedImage} 
                alt="Cropped Preview" 
                className={`max-w-full h-auto max-h-[200px] rounded-md ${cropShape === 'circle' ? 'rounded-full' : ''}`}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="video-upload">Video Upload</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('video-upload')?.click()}
              className="cursor-pointer"
            >
              <Video className="mr-2 h-4 w-4" /> Upload Video
            </Button>
            {videoFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {videoFile.name}
              </span>
            )}
          </div>
          <FilePreview file={videoFile} type="video" />
        </div>
        
        <div className="space-y-2">
          <Label>Drag and Drop</Label>
          <div 
            className={`border-2 border-dashed rounded-md p-10 text-center transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload size={32} className="text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm">
                Drag and drop files here or
              </p>
              <Button 
                variant="ghost" 
                className="mt-2" 
                onClick={() => document.getElementById('drag-drop-file')?.click()}
              >
                Browse files
              </Button>
              <Input
                id="drag-drop-file"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    if (file.type.startsWith('image/')) {
                      setImageFile(file);
                    } else if (file.type.startsWith('video/')) {
                      setVideoFile(file);
                    } else {
                      setDocumentFile(file);
                    }
                  }
                }}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadFields;
