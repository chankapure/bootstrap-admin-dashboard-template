
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ChartCard from '@/components/dashboard/ChartCard';
import { Button } from '@/components/ui/button';
import { Download, FileText, Filter, RefreshCw } from 'lucide-react';

// Sample data for reports
const dailyData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 150 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 210 },
  { name: 'Fri', value: 250 },
  { name: 'Sat', value: 200 },
  { name: 'Sun', value: 140 },
];

const weeklyData = [
  { name: 'Week 1', value: 890 },
  { name: 'Week 2', value: 950 },
  { name: 'Week 3', value: 1200 },
  { name: 'Week 4', value: 1100 },
];

const monthlyData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4800 },
  { name: 'May', value: 5500 },
  { name: 'Jun', value: 6000 },
];

const deviceData = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 30 },
  { name: 'Tablet', value: 5 },
];

const locationData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 25 },
  { name: 'Asia', value: 20 },
  { name: 'Other', value: 10 },
];

const Reports = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  
  const getTimeframeData = () => {
    switch(timeframe) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return weeklyData;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Reports & Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and generate reports</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select defaultValue="weekly" onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="traffic">
        <TabsList className="mb-4">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard 
              title="Traffic Overview"
              type="line"
              data={getTimeframeData()}
            />
            <ChartCard 
              title="Traffic by Device"
              type="pie"
              data={deviceData}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard 
              title="Traffic by Location"
              type="pie"
              data={locationData}
            />
            <Card>
              <CardContent className="p-5">
                <h3 className="text-base font-medium mb-4">Traffic Insights</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Peak traffic hours: 2-4 PM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>45% of users are returning visitors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Average session duration: 3:24</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Mobile bounce rate decreased by 12%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Top referral source: organic search</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard 
              title="Sales Overview"
              type="bar"
              data={getTimeframeData()}
            />
            <Card>
              <CardContent className="p-5">
                <h3 className="text-base font-medium mb-4">Sales Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Total Revenue</span>
                      <span className="text-sm font-medium">$48,352</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-accent h-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                      <span className="text-sm font-medium">3.2%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-accent h-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Average Order Value</span>
                      <span className="text-sm font-medium">$124</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-accent h-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard 
              title="User Growth"
              type="area"
              data={getTimeframeData()}
            />
            <ChartCard 
              title="User Demographics"
              type="pie"
              data={[
                { name: '18-24', value: 20 },
                { name: '25-34', value: 35 },
                { name: '35-44', value: 25 },
                { name: '45+', value: 20 },
              ]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="engagement">
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard 
              title="Page Views"
              type="line"
              data={getTimeframeData()}
            />
            <ChartCard 
              title="Average Session Duration"
              type="bar"
              data={getTimeframeData().map(item => ({
                name: item.name,
                value: item.value / 100, // Converting to minutes for this example
              }))}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
