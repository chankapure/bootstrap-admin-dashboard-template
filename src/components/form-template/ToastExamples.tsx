
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, XCircle, BellRing } from 'lucide-react';

const ToastExamples = () => {
  const { toast: shadcnToast } = useToast();
  
  const showSuccessToast = () => {
    shadcnToast({
      title: "Success!",
      description: "Your action has been completed successfully.",
      variant: "default",
    });
  };
  
  const showErrorToast = () => {
    shadcnToast({
      title: "Error!",
      description: "There was a problem with your request.",
      variant: "destructive",
    });
  };
  
  const showSonnerSuccess = () => {
    toast.success('Action completed successfully', {
      description: 'Your changes have been saved.',
    });
  };
  
  const showSonnerError = () => {
    toast.error('Action failed', {
      description: 'There was a problem with your request.',
    });
  };
  
  const showSonnerInfo = () => {
    toast.info('Information', {
      description: 'This is an informational message.',
    });
  };
  
  const showSonnerWarning = () => {
    toast.warning('Warning', {
      description: 'This action might have consequences.',
    });
  };
  
  const showSonnerCustom = () => {
    toast('New notification', {
      description: 'You have a new message.',
      icon: <BellRing className="h-4 w-4" />,
      action: {
        label: 'View',
        onClick: () => alert('View action clicked'),
      },
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Toast Messages</CardTitle>
        <CardDescription>
          Notification toast messages with different states and styles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Shadcn Toast Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shadcn Toast</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={showSuccessToast}
                className="flex items-center"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Success Toast
              </Button>
              
              <Button 
                variant="outline" 
                onClick={showErrorToast}
                className="flex items-center"
              >
                <XCircle className="mr-2 h-4 w-4" /> Error Toast
              </Button>
            </div>
          </div>
          
          {/* Sonner Toast Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sonner Toast</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={showSonnerSuccess}
                className="flex items-center"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Success Toast
              </Button>
              
              <Button 
                variant="outline" 
                onClick={showSonnerError}
                className="flex items-center"
              >
                <XCircle className="mr-2 h-4 w-4" /> Error Toast
              </Button>
              
              <Button 
                variant="outline" 
                onClick={showSonnerInfo}
                className="flex items-center"
              >
                <Info className="mr-2 h-4 w-4" /> Info Toast
              </Button>
              
              <Button 
                variant="outline" 
                onClick={showSonnerWarning}
                className="flex items-center"
              >
                <AlertCircle className="mr-2 h-4 w-4" /> Warning Toast
              </Button>
              
              <Button 
                variant="outline" 
                onClick={showSonnerCustom}
                className="flex items-center"
              >
                <BellRing className="mr-2 h-4 w-4" /> Custom Toast
              </Button>
            </div>
          </div>
          
          <div className="rounded-md bg-muted p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-foreground">Toast Usage</h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>
                    This project includes two toast systems:
                  </p>
                  <ul className="list-disc ml-5 space-y-1 mt-2">
                    <li>Shadcn Toast - More customizable with component-based approach</li>
                    <li>Sonner - Simpler API with built-in animations and styles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToastExamples;
