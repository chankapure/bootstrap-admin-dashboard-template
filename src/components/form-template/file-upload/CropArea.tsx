
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Square, Circle, RotateCw, RotateCcw } from 'lucide-react';
import { getCroppedImg } from './utils';

interface CropAreaProps {
  imageUrl: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio: 'square' | 'banner';
}

export const CropArea = ({ imageUrl, onCrop, onCancel, aspectRatio }: CropAreaProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropShape, setCropShape] = useState<'rect' | 'round'>(aspectRatio === 'square' ? 'round' : 'rect');
  const [aspectRatioValue, setAspectRatioValue] = useState<number | undefined>(aspectRatio === 'square' ? 1 : 3 / 1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onCropComplete = async (
    croppedArea: { x: number; y: number; width: number; height: number },
    croppedAreaPixelsLocal: { x: number; y: number; width: number; height: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixelsLocal);
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        rotation,
        cropShape === 'round'
      );
      onCrop(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 1));
  };

  const handleRotateClockwise = () => {
    setRotation(prevRotation => prevRotation + 90);
  };

  const handleRotateCounterClockwise = () => {
    setRotation(prevRotation => prevRotation - 90);
  };

  const toggleCropShape = () => {
    setCropShape(prev => prev === 'rect' ? 'round' : 'rect');
  };

  const toggleFreeForm = () => {
    setAspectRatioValue(prev => prev ? undefined : aspectRatio === 'square' ? 1 : 3 / 1);
  };

  return (
    <div className="relative w-full h-[300px]">
      <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatioValue}
        cropShape={cropShape}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        rotation={rotation}
        onRotationChange={setRotation}
        showGrid={true}
      />
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center bg-black/50 text-white">
        <div className="flex space-x-2 items-center">
          <Button size="icon" onClick={handleZoomIn} title="Zoom In"><ZoomIn className="h-4 w-4" /></Button>
          <Button size="icon" onClick={handleZoomOut} title="Zoom Out"><ZoomOut className="h-4 w-4" /></Button>
          <Button size="icon" onClick={handleRotateClockwise} title="Rotate Clockwise"><RotateCw className="h-4 w-4" /></Button>
          <Button size="icon" onClick={handleRotateCounterClockwise} title="Rotate Counter-clockwise"><RotateCcw className="h-4 w-4" /></Button>
          
          <div className="border-l border-white/20 h-6 mx-1"></div>
          
          <Button 
            size="icon" 
            onClick={toggleCropShape} 
            variant={cropShape === 'round' ? 'secondary' : 'ghost'}
            title="Toggle Circle/Square Shape"
          >
            {cropShape === 'round' ? <Circle className="h-4 w-4" /> : <Square className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant={aspectRatioValue ? 'ghost' : 'secondary'}
            size="sm"
            onClick={toggleFreeForm}
          >
            {aspectRatioValue ? 'Free Form' : 'Fixed Ratio'}
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleCrop}>Crop</Button>
        </div>
      </div>
    </div>
  );
};
