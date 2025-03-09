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
  aspectRatio?: 'square' | 'rectangle' | 'banner';
}

const CropArea = ({ imageUrl, onCrop, onCancel, aspectRatio = 'square' }: CropAreaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cropPosition, setCropPosition] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveStartPos, setMoveStartPos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [cropShape, setCropShape] = useState<'square' | 'circle'>(aspectRatio === 'square' ? 'square' : 'rectangle');
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
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
      
      drawImageWithZoom(ctx, img, zoomLevel);
      imgRef.current = img;
      
      let width, height, startX, startY;
      
      if (aspectRatio === 'banner') {
        width = Math.min(img.width * 0.9, img.width);
        height = width / 3;
        startX = (img.width - width) / 2;
        startY = (img.height - height) / 2;
      } else if (aspectRatio === 'rectangle') {
        width = Math.min(img.width * 0.8, img.width);
        height = width * 0.75;
        startX = (img.width - width) / 2;
        startY = (img.height - height) / 2;
      } else {
        const size = Math.min(img.width, img.height) / 2;
        width = size;
        height = size;
        startX = (img.width - size) / 2;
        startY = (img.height - size) / 2;
      }
      
      setCropPosition({ 
        startX, 
        startY, 
        endX: startX + width, 
        endY: startY + height 
      });
      
      drawCropArea(ctx, { startX, startY, endX: startX + width, endY: startY + height });
      updatePreview({ startX, startY, endX: startX + width, endY: startY + height });
    };
  }, [imageUrl, aspectRatio]);
  
  React.useEffect(() => {
    if (!canvasRef.current || !imgRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawImageWithZoom(ctx, imgRef.current, zoomLevel);
    
    drawCropArea(ctx, cropPosition);
    updatePreview(cropPosition);
  }, [zoomLevel]);
  
  const drawImageWithZoom = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, zoom: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const scaledWidth = img.width * zoom;
    const scaledHeight = img.height * zoom;
    const offsetX = (canvas.width - scaledWidth) / 2;
    const offsetY = (canvas.height - scaledHeight) / 2;
    
    ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
  };
  
  const drawCropArea = (ctx: CanvasRenderingContext2D, pos: typeof cropPosition) => {
    if (!canvasRef.current || !imgRef.current) return;
    
    const { startX, startY, endX, endY } = pos;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    ctx.save();
    
    drawImageWithZoom(ctx, imgRef.current, zoomLevel);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    ctx.globalCompositeOperation = 'destination-out';
    
    if (cropShape === 'circle') {
      const radius = width / 2;
      const centerX = startX + radius;
      const centerY = startY + radius;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(startX, startY, width, height);
    }
    
    ctx.globalCompositeOperation = 'source-over';
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    if (cropShape === 'circle') {
      const radius = width / 2;
      const centerX = startX + radius;
      const centerY = startY + radius;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.strokeRect(startX, startY, width, height);
    }
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    
    if (cropShape === 'square' || cropShape === 'rectangle') {
      const thirdHeight = height / 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY + thirdHeight);
      ctx.lineTo(endX, startY + thirdHeight);
      ctx.moveTo(startX, startY + 2 * thirdHeight);
      ctx.lineTo(endX, startY + 2 * thirdHeight);
      
      const thirdWidth = width / 3;
      ctx.moveTo(startX + thirdWidth, startY);
      ctx.lineTo(startX + thirdWidth, endY);
      ctx.moveTo(startX + 2 * thirdWidth, startY);
      ctx.lineTo(startX + 2 * thirdWidth, endY);
      ctx.stroke();
    }
    
    ctx.fillStyle = '#3b82f6';
    const handleSize = 10;
    
    if (cropShape !== 'circle') {
      ctx.fillRect(startX - handleSize/2, startY - handleSize/2, handleSize, handleSize);
      ctx.fillRect(endX - handleSize/2, startY - handleSize/2, handleSize, handleSize);
      ctx.fillRect(startX - handleSize/2, endY - handleSize/2, handleSize, handleSize);
      ctx.fillRect(endX - handleSize/2, endY - handleSize/2, handleSize, handleSize);
      
      if (aspectRatio !== 'square') {
        ctx.fillRect(startX + width/2 - handleSize/2, startY - handleSize/2, handleSize, handleSize);
        ctx.fillRect(startX + width/2 - handleSize/2, endY - handleSize/2, handleSize, handleSize);
        ctx.fillRect(startX - handleSize/2, startY + height/2 - handleSize/2, handleSize, handleSize);
        ctx.fillRect(endX - handleSize/2, startY + height/2 - handleSize/2, handleSize, handleSize);
      }
    }
    
    ctx.restore();
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
    
    const scaledWidth = imgRef.current.width * zoomLevel;
    const scaledHeight = imgRef.current.height * zoomLevel;
    const offsetX = (canvasRef.current!.width - scaledWidth) / 2;
    const offsetY = (canvasRef.current!.height - scaledHeight) / 2;
    
    const sourceX = (startX - offsetX) / zoomLevel;
    const sourceY = (startY - offsetY) / zoomLevel;
    const sourceWidth = width / zoomLevel;
    const sourceHeight = height / zoomLevel;
    
    previewCtx.clearRect(0, 0, width, height);
    
    if (
      sourceX >= 0 && 
      sourceY >= 0 && 
      sourceX + sourceWidth <= imgRef.current.width &&
      sourceY + sourceHeight <= imgRef.current.height
    ) {
      previewCtx.drawImage(
        imgRef.current,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, width, height
      );
    }
    
    if (cropShape === 'circle') {
      previewCtx.globalCompositeOperation = 'destination-in';
      previewCtx.beginPath();
      previewCtx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      previewCtx.fill();
      previewCtx.globalCompositeOperation = 'source-over';
    }
  };
  
  const getResizeHandle = (x: number, y: number) => {
    const { startX, startY, endX, endY } = cropPosition;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    const handleSize = 10;
    
    if (cropShape === 'circle') return null;
    
    if (Math.abs(x - startX) <= handleSize && Math.abs(y - startY) <= handleSize) return 'tl';
    if (Math.abs(x - endX) <= handleSize && Math.abs(y - startY) <= handleSize) return 'tr';
    if (Math.abs(x - startX) <= handleSize && Math.abs(y - endY) <= handleSize) return 'bl';
    if (Math.abs(x - endX) <= handleSize && Math.abs(y - endY) <= handleSize) return 'br';
    
    if (aspectRatio !== 'square') {
      if (Math.abs(x - (startX + width/2)) <= handleSize && Math.abs(y - startY) <= handleSize) return 'tm';
      if (Math.abs(x - (startX + width/2)) <= handleSize && Math.abs(y - endY) <= handleSize) return 'bm';
      if (Math.abs(x - startX) <= handleSize && Math.abs(y - (startY + height/2)) <= handleSize) return 'lm';
      if (Math.abs(x - endX) <= handleSize && Math.abs(y - (startY + height/2)) <= handleSize) return 'rm';
    }
    
    return null;
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const handle = getResizeHandle(x, y);
    if (handle) {
      setResizeHandle(handle);
      setIsDragging(false);
      setIsMoving(false);
      return;
    }
    
    if (
      x >= cropPosition.startX && 
      x <= cropPosition.endX && 
      y >= cropPosition.startY && 
      y <= cropPosition.endY
    ) {
      setIsMoving(true);
      setMoveStartPos({ x, y });
      setIsDragging(false);
      setResizeHandle(null);
    } else {
      setIsDragging(true);
      setIsMoving(false);
      setResizeHandle(null);
      setCropPosition({ startX: x, startY: y, endX: x, endY: y });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    if (resizeHandle) {
      let newPos = { ...cropPosition };
      
      switch (resizeHandle) {
        case 'tl': newPos.startX = x; newPos.startY = y; break;
        case 'tr': newPos.endX = x; newPos.startY = y; break;
        case 'bl': newPos.startX = x; newPos.endY = y; break;
        case 'br': newPos.endX = x; newPos.endY = y; break;
        case 'tm': newPos.startY = y; break;
        case 'bm': newPos.endY = y; break;
        case 'lm': newPos.startX = x; break;
        case 'rm': newPos.endX = x; break;
      }
      
      if ((cropShape === 'square' || aspectRatio === 'square') && resizeHandle !== 'tm' && resizeHandle !== 'bm' && resizeHandle !== 'lm' && resizeHandle !== 'rm') {
        const width = Math.abs(newPos.endX - newPos.startX);
        
        if (resizeHandle === 'tl') {
          newPos.startY = newPos.endY - width;
        } else if (resizeHandle === 'tr') {
          newPos.startY = newPos.endY - width;
        } else if (resizeHandle === 'bl') {
          newPos.endY = newPos.startY + width;
        } else if (resizeHandle === 'br') {
          newPos.endY = newPos.startY + width;
        }
      } else if (aspectRatio === 'banner' && resizeHandle !== 'lm' && resizeHandle !== 'rm') {
        const width = Math.abs(newPos.endX - newPos.startX);
        const height = width / 3;
        
        if (resizeHandle.includes('t')) {
          newPos.startY = newPos.endY - height;
        } else if (resizeHandle.includes('b')) {
          newPos.endY = newPos.startY + height;
        }
      } else if (aspectRatio === 'rectangle' && resizeHandle !== 'tm' && resizeHandle !== 'bm' && resizeHandle !== 'lm' && resizeHandle !== 'rm') {
        const width = Math.abs(newPos.endX - newPos.startX);
        const height = width * 0.75;
        
        if (resizeHandle.includes('t')) {
          newPos.startY = newPos.endY - height;
        } else if (resizeHandle.includes('b')) {
          newPos.endY = newPos.startY + height;
        }
      }
      
      setCropPosition(newPos);
      drawCropArea(ctx, newPos);
      updatePreview(newPos);
      return;
    }
    
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
      return;
    }
    
    if (isDragging) {
      let newPos = { ...cropPosition, endX: x, endY: y };
      
      if (cropShape === 'square' || aspectRatio === 'square') {
        const width = Math.abs(newPos.endX - newPos.startX);
        
        if (newPos.endY > newPos.startY) {
          newPos.endY = newPos.startY + width;
        } else {
          newPos.endY = newPos.startY - width;
        }
      } else if (aspectRatio === 'banner') {
        const width = Math.abs(newPos.endX - newPos.startX);
        const height = width / 3;
        
        if (newPos.endY > newPos.startY) {
          newPos.endY = newPos.startY + height;
        } else {
          newPos.endY = newPos.startY - height;
        }
      } else if (aspectRatio === 'rectangle') {
        const width = Math.abs(newPos.endX - newPos.startX);
        const height = width * 0.75;
        
        if (newPos.endY > newPos.startY) {
          newPos.endY = newPos.startY + height;
        } else {
          newPos.endY = newPos.startY - height;
        }
      }
      
      if (newPos.endX > canvas.width) newPos.endX = canvas.width;
      if (newPos.endY > canvas.height) newPos.endY = canvas.height;
      if (newPos.endX < 0) newPos.endX = 0;
      if (newPos.endY < 0) newPos.endY = 0;
      
      setCropPosition(newPos);
      drawCropArea(ctx, newPos);
      updatePreview(newPos);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsMoving(false);
    setResizeHandle(null);
  };
  
  const handleZoom = (direction: 'in' | 'out') => {
    if (!canvasRef.current || !imgRef.current) return;
    
    const newZoomLevel = direction === 'in' 
      ? Math.min(zoomLevel + 0.1, 3) 
      : Math.max(zoomLevel - 0.1, 0.5);
    
    setZoomLevel(newZoomLevel);
  };
  
  const toggleCropShape = () => {
    if (aspectRatio === 'square') {
      const newShape = cropShape === 'square' ? 'circle' : 'square';
      setCropShape(newShape);
      
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          drawCropArea(ctx, cropPosition);
          updatePreview(cropPosition);
        }
      }
    }
  };
  
  const handleCrop = () => {
    if (!canvasRef.current || !imgRef.current) return;
    
    const tempCanvas = document.createElement('canvas');
    const startX = Math.min(cropPosition.startX, cropPosition.endX);
    const startY = Math.min(cropPosition.startY, cropPosition.endY);
    const width = Math.abs(cropPosition.endX - cropPosition.startX);
    const height = Math.abs(cropPosition.endY - cropPosition.startY);
    
    const outputScale = 2;
    tempCanvas.width = width * outputScale;
    tempCanvas.height = height * outputScale;
    
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    const scaledWidth = imgRef.current.width * zoomLevel;
    const scaledHeight = imgRef.current.height * zoomLevel;
    const offsetX = (canvasRef.current.width - scaledWidth) / 2;
    const offsetY = (canvasRef.current.height - scaledHeight) / 2;
    
    const sourceX = (startX - offsetX) / zoomLevel;
    const sourceY = (startY - offsetY) / zoomLevel;
    const sourceWidth = width / zoomLevel;
    const sourceHeight = height / zoomLevel;
    
    tempCtx.drawImage(
      imgRef.current,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, tempCanvas.width, tempCanvas.height
    );
    
    if (cropShape === 'circle') {
      tempCtx.globalCompositeOperation = 'destination-in';
      tempCtx.beginPath();
      tempCtx.arc(tempCanvas.width / 2, tempCanvas.height / 2, tempCanvas.width / 2, 0, Math.PI * 2);
      tempCtx.fill();
      tempCtx.globalCompositeOperation = 'source-over';
    }
    
    const croppedImageData = tempCanvas.toDataURL('image/png', 1.0);
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
        {aspectRatio === 'square' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleCropShape}
            title="Toggle Crop Shape"
          >
            {cropShape === 'square' ? 'Circle Crop' : 'Square Crop'}
          </Button>
        )}
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
              {aspectRatio === 'square' ? (cropShape === 'square' ? 'Square' : 'Circle') : 
               aspectRatio === 'banner' ? 'Banner (3:1)' : 'Rectangle (4:3)'} | Zoom: {(zoomLevel * 100).toFixed(0)}%
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
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [croppedBanner, setCroppedBanner] = useState<string | null>(null);
  const [cropType, setCropType] = useState<'profile' | 'banner'>('profile');
  
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
      setCropType('profile');
    }
  };
  
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerImageUrl(URL.createObjectURL(file));
      setCropType('banner');
    }
  };
  
  const handleCropComplete = (croppedImageData: string) => {
    if (cropType === 'profile') {
      setCroppedImage(croppedImageData);
      setCropImageUrl(null);
      toast({
        title: "Profile image cropped successfully",
        description: "Your profile image has been cropped and is ready to use."
      });
    } else {
      setCroppedBanner(croppedImageData);
      setBannerImageUrl(null);
      toast({
        title: "Banner image cropped successfully",
        description: "Your banner image has been cropped and is ready to use."
      });
    }
  };
  
  const handleCropCancel = () => {
    if (cropType === 'profile') {
      setCropImageUrl(null);
    } else {
      setBannerImageUrl(null);
    }
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
          <Label htmlFor="crop-image-upload">LinkedIn-style Profile Image Crop</Label>
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
              <Crop className="mr-2 h-4 w-4" /> Upload & Crop Profile Image
            </Button>
          </div>
          
          {cropImageUrl && cropType === 'profile' && (
            <CropArea 
              imageUrl={cropImageUrl}
              onCrop={handleCropComplete}
              onCancel={handleCropCancel}
              aspectRatio="square"
            />
          )}
          
          {croppedImage && !cropImageUrl && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">Cropped Profile Image:</p>
              <img 
                src={croppedImage} 
                alt="Cropped Preview" 
                className={`max-w-full h-auto max-h-[200px] rounded-md ${cropShape === 'circle' ? 'rounded-full' : ''}`}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="banner-image-upload">Cover Image/Banner Crop (Facebook/LinkedIn style)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="banner-image-upload"
              type="file"
              accept="image/*"
              onChange={handleBannerImageChange}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('banner-image-upload')?.click()}
              className="cursor-pointer"
            >
              <Crop className="mr-2 h-4 w-4" /> Upload & Crop Banner Image
            </Button>
          </div>
          
          {bannerImageUrl && cropType === 'banner' && (
            <CropArea 
              imageUrl={bannerImageUrl}
              onCrop={handleCropComplete}
              onCancel={handleCropCancel}
              aspectRatio="banner"
            />
          )}
          
          {croppedBanner && !bannerImageUrl && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">Cropped Banner Image:</p>
              <img 
                src={croppedBanner} 
                alt="Cropped Banner Preview" 
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
