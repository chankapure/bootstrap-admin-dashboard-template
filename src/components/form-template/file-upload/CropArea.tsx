
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';
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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const aspectRatioValue = aspectRatio === 'square' ? 1 : 3 / 1;

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
        rotation
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

  return (
    <div className="relative w-full h-[300px]">
      <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatioValue}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        rotation={rotation}
        onRotationChange={setRotation}
      />
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center bg-black/50 text-white">
        <div className="flex space-x-2">
          <Button size="icon" onClick={handleZoomIn}><ZoomIn className="h-4 w-4" /></Button>
          <Button size="icon" onClick={handleZoomOut}><ZoomOut className="h-4 w-4" /></Button>
          <Button size="icon" onClick={() => {}}><Move className="h-4 w-4" /></Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleCrop}>Crop</Button>
        </div>
      </div>
    </div>
  );
};
