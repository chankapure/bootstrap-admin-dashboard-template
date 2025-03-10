
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FilePreview } from './FilePreview';

interface UploadFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  buttonText: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  type: 'document' | 'image' | 'video';
}

export const UploadField = ({
  id,
  label,
  icon,
  buttonText,
  file,
  onChange,
  accept,
  type
}: UploadFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center space-x-2">
        <Input
          id={id}
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById(id)?.click()}
          className="cursor-pointer"
        >
          {icon} {buttonText}
        </Button>
        {file && (
          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
            {file.name}
          </span>
        )}
      </div>
      <FilePreview file={file} type={type} />
    </div>
  );
};
