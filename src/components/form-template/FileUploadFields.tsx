import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileType, Video, Crop } from 'lucide-react';
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
  const [cropPosition, setCropPosition] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [isDragging, setIsDragging] = useState(false);
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
    };
  }, [imageUrl]);
  
  const drawCropArea = (ctx: CanvasRenderingContext2D, pos: typeof cropPosition) => {
    if (!canvasRef.current || !imgRef.current) return;
    
    const { startX, startY, endX, endY } = pos;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(imgRef.current, 0, 0);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    ctx.clearRect(startX, startY, endX - startX, endY - startY);
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, endX - startX, endY - startY);
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    setIsDragging(true);
    setCropPosition({ ...cropPosition, startX: x, startY: y, endX: x, endY: y });
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const newPos = { ...cropPosition, endX: x, endY: y };
    setCropPosition(newPos);
    drawCropArea(ctx, newPos);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
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
      canvas,
      startX, startY, width, height,
      0, 0, width, height
    );
    
    const croppedImageData = croppedCanvas.toDataURL('image/png');
    onCrop(croppedImageData);
  };
  
  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden max-w-full">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto object-contain"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleCrop}>Crop Image</Button>
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
          <Label htmlFor="crop-image-upload">Image Upload with Crop</Label>
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
                className="max-w-full h-auto max-h-[200px] rounded-md"
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
