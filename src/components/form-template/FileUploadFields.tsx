
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileType, Image as LucideImage, Video, Info } from 'lucide-react';
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
    <Card className="border-2 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-accent/10 to-transparent border-b pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Upload className="h-6 w-6 text-accent" />
          File Upload
        </CardTitle>
        <CardDescription className="text-base">
          Upload documents, images, videos with preview support and delete confirmation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <UploadField
          id="document-upload"
          label="Document Upload"
          icon={<Upload className="mr-2 h-4 w-4" />}
          buttonText="Upload Document"
          file={documentFile}
          onChange={handleDocumentChange}
          type="document"
          onDelete={() => setDocumentFile(null)}
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
          onDelete={() => setImageFile(null)}
        />

        <UploadField
          id="video-upload"
          label="Video Upload"
          icon={<Video className="mr-2 h-4 w-4" />}
          buttonText="Upload Video"
          file={videoFile}
          onChange={handleVideoChange}
          accept="video/*"
          type="video"
          onDelete={() => setVideoFile(null)}
        />

        <div className="space-y-4">
          <div className="flex items-center">
            <h3 className="text-lg font-medium">Image Cropping</h3>
            <div className="ml-2 text-sm text-muted-foreground hover:bg-secondary p-1 rounded-full cursor-help relative group">
              <Info size={16} />
              <div className="absolute left-full ml-2 top-0 z-50 w-64 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                Upload and crop profile pictures or banner images to exact dimensions
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-4 rounded-lg border bg-secondary/30">
              <h4 className="font-medium text-center">Profile Image (1:1)</h4>
              <UploadField
                id="crop-image-upload"
                label="Select image to crop"
                icon={<LucideImage className="mr-2 h-4 w-4" />}
                buttonText="Select Image"
                file={null}
                onChange={handleCropImageChange}
                accept="image/*"
                type="image"
              />
              
              {croppedImage && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Cropped Result:</div>
                  <div className="flex justify-center">
                    <img 
                      src={croppedImage} 
                      alt="Cropped" 
                      className="max-w-full h-auto max-h-[150px] rounded-full border-4 border-background shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4 p-4 rounded-lg border bg-secondary/30">
              <h4 className="font-medium text-center">Banner Image (3:1)</h4>
              <UploadField
                id="banner-image-upload"
                label="Select banner to crop"
                icon={<LucideImage className="mr-2 h-4 w-4" />}
                buttonText="Select Banner"
                file={null}
                onChange={handleBannerImageChange}
                accept="image/*"
                type="image"
              />
              
              {croppedBanner && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Cropped Banner:</div>
                  <img 
                    src={croppedBanner} 
                    alt="Cropped Banner" 
                    className="max-w-full h-auto max-h-[100px] rounded-md border border-border shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
          
          {(cropImageUrl || bannerImageUrl) && (
            <div className="mt-4 p-4 border rounded-md bg-background shadow-md">
              <CropArea 
                imageUrl={cropType === 'profile' ? cropImageUrl! : bannerImageUrl!}
                onCrop={handleCropComplete}
                onCancel={handleCropCancel}
                aspectRatio={cropType === 'profile' ? 'square' : 'banner'}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Drag and Drop</h3>
          <div 
            className={`border-2 border-dashed rounded-lg p-10 text-center ${
              dragOver ? 'border-accent bg-accent/5 shadow-inner' : 'border-border hover:border-accent/50 hover:bg-secondary/20'
            } transition-all duration-200 cursor-pointer`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('drag-drop-input')?.click()}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className={`p-3 rounded-full ${dragOver ? 'bg-accent/10' : 'bg-secondary'} transition-colors duration-200`}>
                <Upload className={`h-8 w-8 ${dragOver ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
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
                    toast({
                      title: 'File Uploaded',
                      description: `${file.name} has been uploaded successfully.`,
                    });
                  }
                }}
              />
              <Button 
                variant="secondary" 
                size="sm"
                className="mt-2"
              >
                Browse Files
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2 bg-secondary/30 p-2 rounded-md">
            <p>Supported file types: Images (.jpg, .png, .gif), Videos (.mp4, .webm), Documents (.pdf, .docx, .txt)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadFields;
