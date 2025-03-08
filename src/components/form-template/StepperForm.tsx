
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 'personal',
    name: 'Personal Information',
    fields: ['name', 'email', 'phone'],
  },
  {
    id: 'address',
    name: 'Address',
    fields: ['street', 'city', 'state', 'zip'],
  },
  {
    id: 'account',
    name: 'Account Details',
    fields: ['username', 'password', 'confirmPassword'],
  },
  {
    id: 'review',
    name: 'Review & Submit',
    fields: ['terms'],
  },
];

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    username: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  
  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted with the following data: ' + JSON.stringify(formData, null, 2));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-Step Form</CardTitle>
        <CardDescription>
          A step-by-step form with progress indicator.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index < currentStep 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : index === currentStep 
                        ? 'border-primary text-primary' 
                        : 'border-muted-foreground text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-muted" />
            <div 
              className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="Enter your phone number" 
                />
              </div>
            </div>
          )}
          
          {/* Step 2: Address Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input 
                  id="street" 
                  value={formData.street} 
                  onChange={(e) => updateFormData('street', e.target.value)}
                  placeholder="Enter your street address" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={formData.city} 
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="Enter your city" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => updateFormData('state', value)}
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="fl">Florida</SelectItem>
                      <SelectItem value="il">Illinois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input 
                    id="zip" 
                    value={formData.zip} 
                    onChange={(e) => updateFormData('zip', e.target.value)}
                    placeholder="Enter ZIP code" 
                    required 
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Account Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={formData.username} 
                  onChange={(e) => updateFormData('username', e.target.value)}
                  placeholder="Choose a username" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => updateFormData('password', e.target.value)}
                  placeholder="Create a password" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword} 
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  placeholder="Confirm your password" 
                  required 
                />
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">Passwords do not match</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 4: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="rounded-md border p-4">
                <dl className="divide-y">
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-muted-foreground">Full name</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{formData.name}</dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-muted-foreground">Email address</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{formData.email}</dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-muted-foreground">Phone number</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{formData.phone}</dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                      {formData.street}, {formData.city}, {formData.state} {formData.zip}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-muted-foreground">Username</dt>
                    <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{formData.username}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.terms} 
                  onCheckedChange={(checked) => 
                    updateFormData('terms', checked === true)
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions
                </Label>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.terms}
          >
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StepperForm;
