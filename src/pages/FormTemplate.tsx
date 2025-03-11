
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload, Check, Trash, Play, Pause, Volume2, VolumeX, ChevronDown, FileType, Image, Video, Film, Radio } from 'lucide-react';
import BasicFormFields from '@/components/form-template/BasicFormFields';
import FileUploadFields from '@/components/form-template/FileUploadFields';
import MediaPlayers from '@/components/form-template/MediaPlayers';
import AccordionExample from '@/components/form-template/AccordionExample';
import StepperForm from '@/components/form-template/StepperForm';
import ToastExamples from '@/components/form-template/ToastExamples';

const FormTemplate = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-accent/20 to-background p-6 -m-6 mb-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Form Templates</h1>
        <p className="text-muted-foreground">
          A comprehensive showcase of various form elements and UI components.
        </p>
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
          </div>
          <BasicFormFields />
        </TabsContent>

        <TabsContent value="file-upload" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">File Upload Components</h2>
          </div>
          <FileUploadFields />
        </TabsContent>

        <TabsContent value="media-players" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Media Player Components</h2>
          </div>
          <MediaPlayers />
        </TabsContent>

        <TabsContent value="accordions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Accordion Components</h2>
          </div>
          <AccordionExample />
        </TabsContent>

        <TabsContent value="stepper" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Multi-Step Form</h2>
          </div>
          <StepperForm />
        </TabsContent>

        <TabsContent value="toasts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Toast Notifications</h2>
          </div>
          <ToastExamples />
        </TabsContent>

        <TabsContent value="all" className="space-y-12">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Basic Form Fields</h2>
            </div>
            <BasicFormFields />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">File Upload Components</h2>
            </div>
            <FileUploadFields />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Media Player Components</h2>
            </div>
            <MediaPlayers />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Accordion Components</h2>
            </div>
            <AccordionExample />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Multi-Step Form</h2>
            </div>
            <StepperForm />
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Toast Notifications</h2>
            </div>
            <ToastExamples />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormTemplate;
