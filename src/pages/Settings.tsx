
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Moon, Sun, Bell, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information and avatar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center sm:items-start gap-2">
                    <h3 className="font-medium">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Upload</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue="Product Manager" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue="Product manager with 5+ years of experience in SaaS."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <form onSubmit={handleSaveNotifications}>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you receive notifications from the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium leading-none">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-updates" className="flex-1">
                        Product Updates
                      </Label>
                      <Switch id="email-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-security" className="flex-1">
                        Security Alerts
                      </Label>
                      <Switch id="email-security" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-newsletter" className="flex-1">
                        Newsletter
                      </Label>
                      <Switch id="email-newsletter" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium leading-none">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-all" className="flex-1">
                        All Push Notifications
                      </Label>
                      <Switch id="push-all" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-mentions" className="flex-1">
                        Mentions & Comments
                      </Label>
                      <Switch id="push-mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-reminders" className="flex-1">
                        Reminders
                      </Label>
                      <Switch id="push-reminders" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the dashboard looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="border rounded-md p-4 cursor-pointer hover:border-accent transition-colors flex items-center justify-center">
                      <Sun className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center font-medium">Light</p>
                  </div>
                  <div className="space-y-2">
                    <div className="border rounded-md p-4 cursor-pointer hover:border-accent transition-colors flex items-center justify-center bg-gray-950 text-white">
                      <Moon className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center font-medium">Dark</p>
                  </div>
                  <div className="space-y-2">
                    <div className="border rounded-md p-4 cursor-pointer hover:border-accent transition-colors flex items-center justify-center bg-gradient-to-br from-white to-gray-900">
                      <div className="flex">
                        <Sun className="h-5 w-5 text-black" />
                        <Moon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-center font-medium">System</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="densify">Compact Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Display more content on the screen
                    </p>
                  </div>
                  <Switch id="densify" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable animations and transitions
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Apply Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <form onSubmit={handleChangePassword}>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">
                    Protect your account with 2FA
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Manage your active sessions on different devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Chrome on Windows</div>
                    <div className="text-xs text-muted-foreground">
                      Currently active
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    This Device
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Safari on macOS</div>
                    <div className="text-xs text-muted-foreground">
                      Last active 2 days ago
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Log Out
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Chrome on iPhone</div>
                    <div className="text-xs text-muted-foreground">
                      Last active 1 week ago
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" size="sm">
                Log Out of All Devices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
