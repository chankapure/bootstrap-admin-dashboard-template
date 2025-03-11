
import React from 'react';
import { FileType, Trash, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface FilePreviewProps {
  file: File | null;
  type: 'document' | 'image' | 'video';
  onDelete?: () => void;
}

export const FilePreview = ({ file, type, onDelete }: FilePreviewProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  
  if (!file) return null;
  
  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete();
      toast({
        title: "File Deleted",
        description: `${file.name} has been removed.`,
      });
    }
    setShowDeleteDialog(false);
  };
  
  const handleDownload = () => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `Downloading ${file.name}`,
    });
  };
  
  return (
    <>
      {type === 'image' ? (
        <div className="mt-2 relative group">
          <img 
            src={URL.createObjectURL(file)} 
            alt="Preview" 
            className="max-w-full h-auto max-h-[200px] rounded-md border border-border"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setShowPreview(true)}
            >
              <Eye size={16} />
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleDownload}
            >
              <Download size={16} />
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      ) : type === 'video' ? (
        <div className="mt-2 relative group">
          <video 
            src={URL.createObjectURL(file)} 
            controls 
            className="max-w-full h-auto max-h-[200px] rounded-md border border-border"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex gap-1">
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleDownload}
            >
              <Download size={16} />
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-2 p-4 border border-border rounded-md flex items-center justify-between group hover:bg-secondary/40 transition-all">
          <div className="flex items-center gap-2">
            <FileType size={24} className="text-primary" />
            <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleDownload}
            >
              <Download size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive hover:text-destructive" 
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{file.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview Dialog for Images */}
      {type === 'image' && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="sm:max-w-[80vw] p-1 bg-transparent border-0">
            <img 
              src={URL.createObjectURL(file)} 
              alt="Full Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded-md"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
