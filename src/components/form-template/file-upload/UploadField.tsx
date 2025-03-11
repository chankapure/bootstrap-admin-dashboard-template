
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FilePreview } from './FilePreview';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UploadFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  buttonText: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  type: 'document' | 'image' | 'video';
  onDelete?: () => void;
}

export const UploadField = ({
  id,
  label,
  icon,
  buttonText,
  file,
  onChange,
  accept,
  type,
  onDelete
}: UploadFieldProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setShowDeleteDialog(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2">
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
          className="cursor-pointer transition-all hover:bg-accent/10 hover:text-accent hover:border-accent/50"
        >
          {icon} {buttonText}
        </Button>
        {file && (
          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
            {file.name}
          </span>
        )}
      </div>
      <FilePreview file={file} type={type} onDelete={handleDelete} />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this file?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
