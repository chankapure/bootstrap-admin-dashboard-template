
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileType, Image, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

const FileUploadFields = () => {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  
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
        {/* Document Upload */}
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
        
        {/* Image Upload */}
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
              <Image className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            {imageFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {imageFile.name}
              </span>
            )}
          </div>
          <FilePreview file={imageFile} type="image" />
        </div>
        
        {/* Video Upload */}
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
        
        {/* Drag and Drop */}
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
