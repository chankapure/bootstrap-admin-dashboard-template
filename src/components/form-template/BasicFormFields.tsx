
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const BasicFormFields = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Form Fields</CardTitle>
        <CardDescription>
          Standard form input elements including text fields, selects, checkboxes, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Input */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
        </div>
        
        {/* Select */}
        <div>
          <Label htmlFor="country">Country</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Checkbox */}
        <div className="flex flex-col gap-2">
          <Label>Interests</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="technology" />
            <Label htmlFor="technology" className="cursor-pointer">Technology</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="design" />
            <Label htmlFor="design" className="cursor-pointer">Design</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="business" />
            <Label htmlFor="business" className="cursor-pointer">Business</Label>
          </div>
        </div>
        
        {/* Radio Buttons */}
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <RadioGroup defaultValue="beginner">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced" className="cursor-pointer">Advanced</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Textarea */}
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea 
            id="message" 
            placeholder="Write your message here" 
            className="min-h-[120px]"
          />
        </div>
        
        {/* Switch */}
        <div className="flex items-center space-x-2">
          <Switch 
            id="notifications" 
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
          <Label htmlFor="notifications" className="cursor-pointer">
            Enable notifications
          </Label>
        </div>
        
        <Button className="mt-4">Submit Form</Button>
      </CardContent>
    </Card>
  );
};

export default BasicFormFields;
