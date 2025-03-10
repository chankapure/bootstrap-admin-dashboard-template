import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileType, Check, X, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Image as LucideImage } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';

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
  aspectRatio: 'square' | 'banner';
}

const CropArea = ({ imageUrl, onCrop, onCancel, aspectRatio }: CropAreaProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const cropperRef = useRef<Cropper>(null);

  const aspectRatioValue = aspectRatio === 'square' ? 1 : 3 / 1;

  const onCropComplete = async (croppedArea: Area, croppedAreaPixelsLocal: Area) => {
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

  const handleMove = () => {
    if (cropperRef.current) {
      cropperRef.current.center();
    }
  };

  return (
    <div className="relative w-full h-[300px]">
      <Cropper
        ref={cropperRef}
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatioValue}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        rotation={rotation}
        onRotationChange={setRotation}
        restrictPosition={false}
      />
      <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center bg-black/50 text-white">
        <div className="flex space-x-2">
          <Button size="icon" onClick={handleZoomIn}><ZoomIn className="h-4 w-4" /></Button>
          <Button size="icon" onClick={handleZoomOut}><ZoomOut className="h-4 w-4" /></Button>
          <Button size="icon" onClick={handleMove}><Move className="h-4 w-4" /></Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleCrop}>Crop</Button>
        </div>
      </div>
    </div>
  );
};

async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => image.onload = resolve);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  const rotRad = rotation * Math.PI / 180;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotRad);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(file => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        resolve('');
      }
    }, 'image/jpeg');
  });
}

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
      toast({
        title: 'Document Uploaded',
        description: 'Your document has been uploaded successfully.',
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      toast({
        title: 'Image Uploaded',
        description: 'Your image has been uploaded successfully.',
      });
    }
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      toast({
        title: 'Video Uploaded',
        description: 'Your video has been uploaded successfully.',
      });
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
      toast({
        title: 'File Uploaded',
        description: `${file.name} has been uploaded successfully.`,
      });
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

  const handleCropComplete = (croppedImage: string) => {
    if (cropType === 'profile') {
      setCroppedImage(croppedImage);
      setCropImageUrl(null);
    } else {
      setCroppedBanner(croppedImage);
      setBannerImageUrl(null);
    }
    toast({
      title: 'Image Cropped',
      description: 'Your image has been cropped successfully.',
    });
  };

  const handleCropCancel = () => {
    setCropImageUrl(null);
    setBannerImageUrl(null);
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
              <FileType className="mr-2 h-4 w-4" /> Upload Video
            </Button>
            {videoFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {videoFile.name}
              </span>
            )}
          </div>
          <FilePreview file={videoFile} type="video" />
        </div>
        
        {/* Image cropping section */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Image Cropping</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop-image-upload">Profile Image (1:1)</Label>
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
                  <LucideImage className="mr-2 h-4 w-4" /> Select Image
                </Button>
              </div>
              
              {croppedImage && (
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Cropped Result:</div>
                  <img 
                    src={croppedImage} 
                    alt="Cropped" 
                    className={`max-w-full h-auto max-h-[200px] rounded-md ${cropShape === 'circle' ? 'rounded-full' : ''}`}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="banner-image-upload">Banner Image (3:1)</Label>
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
                  <LucideImage className="mr-2 h-4 w-4" /> Select Banner
                </Button>
              </div>
              
              {croppedBanner && (
                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Cropped Banner:</div>
                  <img 
                    src={croppedBanner} 
                    alt="Cropped Banner" 
                    className="max-w-full h-auto max-h-[200px] rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Crop UI */}
          {(cropImageUrl || bannerImageUrl) && (
            <div className="mt-4 p-4 border rounded-md bg-background">
              {cropType === 'profile' ? (
                <CropArea 
                  imageUrl={cropImageUrl!} 
                  onCrop={handleCropComplete} 
                  onCancel={handleCropCancel}
                  aspectRatio="square"
                />
              ) : (
                <CropArea 
                  imageUrl={bannerImageUrl!} 
                  onCrop={handleCropComplete} 
                  onCancel={handleCropCancel}
                  aspectRatio="banner"
                />
              )}
            </div>
          )}
        </div>
        
        {/* Drag and Drop area */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Drag and Drop</h3>
          <div 
            className={`border-2 border-dashed rounded-md p-8 text-center ${
              dragOver ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <h4 className="text-base font-medium">
                Drag and drop files here
              </h4>
              <p className="text-sm text-muted-foreground">
                Or click to browse
              </p>
              <Input
                id="drag-drop-input"
                type="file"
                className="hidden"
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
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('drag-drop-input')?.click()}
              >
                Browse Files
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadFields;
