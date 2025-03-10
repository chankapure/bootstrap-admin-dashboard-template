
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileType, Image as LucideImage } from 'lucide-react';
import { UploadField } from './file-upload/UploadField';
import { CropArea } from './file-upload/CropArea';

const FileUploadFields = () => {
  const { toast } = useToast();
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
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
        <UploadField
          id="document-upload"
          label="Document Upload"
          icon={<Upload className="mr-2 h-4 w-4" />}
          buttonText="Upload Document"
          file={documentFile}
          onChange={handleDocumentChange}
          type="document"
        />

        <UploadField
          id="image-upload"
          label="Image Upload"
          icon={<LucideImage className="mr-2 h-4 w-4" />}
          buttonText="Upload Image"
          file={imageFile}
          onChange={handleImageChange}
          accept="image/*"
          type="image"
        />

        <UploadField
          id="video-upload"
          label="Video Upload"
          icon={<FileType className="mr-2 h-4 w-4" />}
          buttonText="Upload Video"
          file={videoFile}
          onChange={handleVideoChange}
          accept="video/*"
          type="video"
        />

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Image Cropping</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadField
              id="crop-image-upload"
              label="Profile Image (1:1)"
              icon={<LucideImage className="mr-2 h-4 w-4" />}
              buttonText="Select Image"
              file={null}
              onChange={handleCropImageChange}
              accept="image/*"
              type="image"
            />
            
            <UploadField
              id="banner-image-upload"
              label="Banner Image (3:1)"
              icon={<LucideImage className="mr-2 h-4 w-4" />}
              buttonText="Select Banner"
              file={null}
              onChange={handleBannerImageChange}
              accept="image/*"
              type="image"
            />
          </div>
          
          {croppedImage && (
            <div className="mt-2">
              <div className="text-sm font-medium mb-1">Cropped Result:</div>
              <img 
                src={croppedImage} 
                alt="Cropped" 
                className="max-w-full h-auto max-h-[200px] rounded-md"
              />
            </div>
          )}
          
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
          
          {(cropImageUrl || bannerImageUrl) && (
            <div className="mt-4 p-4 border rounded-md bg-background">
              <CropArea 
                imageUrl={cropType === 'profile' ? cropImageUrl! : bannerImageUrl!}
                onCrop={handleCropComplete}
                onCancel={handleCropCancel}
                aspectRatio={cropType === 'profile' ? 'square' : 'banner'}
              />
            </div>
          )}
        </div>
        
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
