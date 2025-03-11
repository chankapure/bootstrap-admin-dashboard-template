
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload, Check, Trash, Play, Pause, Volume2, VolumeX, ChevronDown, FileType, Image, Video, Film, Radio, AlignVerticalSpaceBetween, FileEdit, UploadCloud, Music, File, Settings2 } from 'lucide-react';
import BasicFormFields from '@/components/form-template/BasicFormFields';
import FileUploadFields from '@/components/form-template/FileUploadFields';
import MediaPlayers from '@/components/form-template/MediaPlayers';
import AccordionExample from '@/components/form-template/AccordionExample';
import StepperForm from '@/components/form-template/StepperForm';
import ToastExamples from '@/components/form-template/ToastExamples';
import { cn } from '@/lib/utils';

interface TabInfo {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const FormTemplate = () => {
  const { toast } = useToast();

  const tabs: TabInfo[] = [
    { id: "basic-fields", label: "Basic Fields", icon: <FileEdit className="h-4 w-4" />, color: "from-blue-300 to-blue-500" },
    { id: "file-upload", label: "File Upload", icon: <UploadCloud className="h-4 w-4" />, color: "from-green-300 to-green-500" },
    { id: "media-players", label: "Media Players", icon: <Music className="h-4 w-4" />, color: "from-purple-300 to-purple-500" },
    { id: "accordions", label: "Accordions", icon: <AlignVerticalSpaceBetween className="h-4 w-4" />, color: "from-yellow-300 to-yellow-500" },
    { id: "stepper", label: "Stepper Form", icon: <Settings2 className="h-4 w-4" />, color: "from-red-300 to-red-500" },
    { id: "toasts", label: "Toasts", icon: <File className="h-4 w-4" />, color: "from-indigo-300 to-indigo-500" },
    { id: "all", label: "All Components", icon: <Settings2 className="h-4 w-4" />, color: "from-gray-300 to-gray-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-accent/20 to-background p-6 -m-6 mb-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Form Templates</h1>
        <p className="text-muted-foreground">
          A comprehensive showcase of various form elements and UI components.
        </p>
      </div>

      <Tabs defaultValue="basic-fields" className="w-full">
        {/* Improved scrollbar with thin, elegant styling */}
        <div className="overflow-x-auto pb-2 -mx-6 px-6 scrollbar-thin">
          <TabsList className="inline-flex w-auto min-w-full md:w-auto bg-secondary/40 p-1 rounded-lg">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className={cn(
                  "group relative overflow-hidden transition-all duration-300",
                  "data-[state=active]:shadow-md"
                )}
              >
                <div 
                  className={cn(
                    "absolute inset-0 opacity-0 bg-gradient-to-r transition-opacity duration-300 -z-10",
                    tab.color,
                    "group-data-[state=active]:opacity-100"
                  )} 
                />
                <div className="flex items-center gap-2">
                  {tab.icon}
                  {/* Improve text visibility with stronger contrast and font-weight */}
                  <span className="group-data-[state=active]:text-white font-medium">{tab.label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="pt-4">
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
        </div>
      </Tabs>
    </div>
  );
};

export default FormTemplate;
