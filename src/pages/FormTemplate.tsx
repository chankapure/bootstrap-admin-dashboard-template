
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload, Check, Trash, Play, Pause, Volume2, VolumeX, ChevronDown, FileType, Image, Video, Film, Radio, Copy, Clipboard, BookOpen, Code } from 'lucide-react';
import BasicFormFields from '@/components/form-template/BasicFormFields';
import FileUploadFields from '@/components/form-template/FileUploadFields';
import MediaPlayers from '@/components/form-template/MediaPlayers';
import AccordionExample from '@/components/form-template/AccordionExample';
import StepperForm from '@/components/form-template/StepperForm';
import ToastExamples from '@/components/form-template/ToastExamples';

const FormTemplate = () => {
  const { toast } = useToast();

  const handleCopyCode = (component: string) => {
    // In a real implementation, this would copy the actual component code
    toast({
      title: 'Component Copied',
      description: `${component} component code copied to clipboard`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-accent/20 to-background p-6 -m-6 mb-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Form Templates</h1>
        <p className="text-muted-foreground">
          A comprehensive showcase of various form elements and UI components.
        </p>
        
        <div className="mt-4 flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-background"
            onClick={() => handleCopyCode('All Components')}
          >
            <Clipboard className="mr-1 h-4 w-4" /> Copy All Code
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-background"
            onClick={() => window.location.href = '#documentation'}
          >
            <BookOpen className="mr-1 h-4 w-4" /> Documentation
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic-fields" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-4 bg-secondary/40 p-1 rounded-lg">
          <TabsTrigger value="basic-fields" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Basic Fields</TabsTrigger>
          <TabsTrigger value="file-upload" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">File Upload</TabsTrigger>
          <TabsTrigger value="media-players" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Media Players</TabsTrigger>
          <TabsTrigger value="accordions" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Accordions</TabsTrigger>
          <TabsTrigger value="stepper" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Stepper Form</TabsTrigger>
          <TabsTrigger value="toasts" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Toasts</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">All Components</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-fields" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Basic Form Fields</h2>
            <Button variant="outline" size="sm" onClick={() => handleCopyCode('Basic Fields')}>
              <Copy className="mr-2 h-3 w-3" /> Copy Code
            </Button>
          </div>
          <BasicFormFields />
        </TabsContent>

        <TabsContent value="file-upload" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">File Upload Components</h2>
            <Button variant="outline" size="sm" onClick={() => handleCopyCode('File Upload')}>
              <Copy className="mr-2 h-3 w-3" /> Copy Code
            </Button>
          </div>
          <FileUploadFields />
        </TabsContent>

        <TabsContent value="media-players" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Media Player Components</h2>
            <Button variant="outline" size="sm" onClick={() => handleCopyCode('Media Players')}>
              <Copy className="mr-2 h-3 w-3" /> Copy Code
            </Button>
          </div>
          <MediaPlayers />
        </TabsContent>

        <TabsContent value="accordions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Accordion Components</h2>
            <Button variant="outline" size="sm" onClick={() => handleCopyCode('Accordions')}>
              <Copy className="mr-2 h-3 w-3" /> Copy Code
            </Button>
          </div>
          <AccordionExample />
        </TabsContent>

        <TabsContent value="stepper" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Multi-Step Form</h2>
            <Button variant="outline" size="sm" onClick={() => handleCopyCode('Stepper Form')}>
              <Copy className="mr-2 h-3 w-3" /> Copy Code
            </Button>
          </div>
          <StepperForm />
        </TabsContent>

        <TabsContent value="toasts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Toast Notifications</h2>
            <Button variant="outline" size="sm" onClick={() => handleCopyCode('Toasts')}>
              <Copy className="mr-2 h-3 w-3" /> Copy Code
            </Button>
          </div>
          <ToastExamples />
        </TabsContent>

        <TabsContent value="all" className="space-y-12">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Basic Form Fields</h2>
              <Button variant="outline" size="sm" onClick={() => handleCopyCode('Basic Fields')}>
                <Copy className="mr-2 h-3 w-3" /> Copy Code
              </Button>
            </div>
            <BasicFormFields />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">File Upload Components</h2>
              <Button variant="outline" size="sm" onClick={() => handleCopyCode('File Upload')}>
                <Copy className="mr-2 h-3 w-3" /> Copy Code
              </Button>
            </div>
            <FileUploadFields />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Media Player Components</h2>
              <Button variant="outline" size="sm" onClick={() => handleCopyCode('Media Players')}>
                <Copy className="mr-2 h-3 w-3" /> Copy Code
              </Button>
            </div>
            <MediaPlayers />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Accordion Components</h2>
              <Button variant="outline" size="sm" onClick={() => handleCopyCode('Accordions')}>
                <Copy className="mr-2 h-3 w-3" /> Copy Code
              </Button>
            </div>
            <AccordionExample />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Multi-Step Form</h2>
              <Button variant="outline" size="sm" onClick={() => handleCopyCode('Stepper Form')}>
                <Copy className="mr-2 h-3 w-3" /> Copy Code
              </Button>
            </div>
            <StepperForm />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Toast Notifications</h2>
              <Button variant="outline" size="sm" onClick={() => handleCopyCode('Toasts')}>
                <Copy className="mr-2 h-3 w-3" /> Copy Code
              </Button>
            </div>
            <ToastExamples />
          </div>
        </TabsContent>
      </Tabs>
      
      <div id="documentation" className="mt-12 p-6 border rounded-lg bg-secondary/10">
        <h2 className="text-2xl font-bold mb-4">Component Documentation</h2>
        <p className="mb-4 text-muted-foreground">
          This template includes reusable components that can be easily copied into your own projects.
          Each component is built with Shadcn UI and follows best practices for accessibility and responsive design.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Browse the components in the tabs above</li>
                <li>Click the "Copy Code" button for the component you want</li>
                <li>Paste the code into your project</li>
                <li>Install any necessary dependencies</li>
              </ol>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Dependencies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Shadcn UI components</li>
                <li>Tailwind CSS</li>
                <li>Lucide React icons</li>
                <li>React Hooks</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 bg-secondary p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Code className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Usage Example</h3>
          </div>
          <pre className="bg-background p-3 rounded text-xs overflow-x-auto">
            {`import { FileUploadFields } from '@/components/form-template/FileUploadFields';

export default function MyForm() {
  return (
    <div>
      <h1>My Custom Form</h1>
      <FileUploadFields />
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;
