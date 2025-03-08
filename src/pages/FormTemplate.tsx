
import React, { useState } from 'react';
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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Form Templates</h1>
        <p className="text-muted-foreground mt-2">
          A comprehensive showcase of various form elements and UI components.
        </p>
      </div>

      <Tabs defaultValue="basic-fields" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-4">
          <TabsTrigger value="basic-fields">Basic Fields</TabsTrigger>
          <TabsTrigger value="file-upload">File Upload</TabsTrigger>
          <TabsTrigger value="media-players">Media Players</TabsTrigger>
          <TabsTrigger value="accordions">Accordions</TabsTrigger>
          <TabsTrigger value="stepper">Stepper Form</TabsTrigger>
          <TabsTrigger value="toasts">Toasts</TabsTrigger>
          <TabsTrigger value="all">All Components</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-fields" className="space-y-6">
          <BasicFormFields />
        </TabsContent>

        <TabsContent value="file-upload" className="space-y-6">
          <FileUploadFields />
        </TabsContent>

        <TabsContent value="media-players" className="space-y-6">
          <MediaPlayers />
        </TabsContent>

        <TabsContent value="accordions" className="space-y-6">
          <AccordionExample />
        </TabsContent>

        <TabsContent value="stepper" className="space-y-6">
          <StepperForm />
        </TabsContent>

        <TabsContent value="toasts" className="space-y-6">
          <ToastExamples />
        </TabsContent>

        <TabsContent value="all" className="space-y-12">
          <BasicFormFields />
          <FileUploadFields />
          <MediaPlayers />
          <AccordionExample />
          <StepperForm />
          <ToastExamples />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormTemplate;
