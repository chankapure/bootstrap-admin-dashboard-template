
import React from 'react';
import { Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, ShoppingCart, UserPlus, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import ActivityItem from '@/components/dashboard/ActivityItem';

// Sample data for charts
const userActivityData = [
  { name: 'Jan', value: 350 },
  { name: 'Feb', value: 400 },
  { name: 'Mar', value: 300 },
  { name: 'Apr', value: 450 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 550 },
  { name: 'Jul', value: 600 },
];

const revenueData = [
  { name: 'Jan', value: 3500 },
  { name: 'Feb', value: 4000 },
  { name: 'Mar', value: 3000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 5000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 6000 },
];

const userSourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 200 },
  { name: 'Other', value: 100 },
];

// Sample activities
const recentActivities = [
  {
    title: 'New User Registration',
    description: 'John Doe created a new account',
    time: '2 hours ago',
    icon: <UserPlus size={16} />,
    iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    title: 'Order Placed',
    description: 'New order #12345 from Jane Smith',
    time: '5 hours ago',
    icon: <ShoppingCart size={16} />,
    iconColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    title: 'Report Generated',
    description: 'Monthly sales report was generated',
    time: '1 day ago',
    icon: <FileText size={16} />,
    iconColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  },
  {
    title: 'Server Maintenance',
    description: 'System updates completed successfully',
    time: '2 days ago',
    icon: <Activity size={16} />,
    iconColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
];

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's your overview</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="12,543"
          icon={<Users size={18} />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Revenue"
          value="$48,352"
          icon={<DollarSign size={18} />}
          change={{ value: "8%", positive: true }}
        />
        <StatCard
          title="Active Sessions"
          value="842"
          icon={<Activity size={18} />}
          change={{ value: "5%", positive: false }}
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          icon={<ArrowUpRight size={18} />}
          change={{ value: "1.2%", positive: true }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard 
          title="User Activity"
          type="area"
          data={userActivityData}
          className="md:col-span-2 lg:col-span-2"
        />
        <Card className="lg:col-span-1">
          <CardContent className="p-5">
            <h3 className="text-base font-medium mb-4">Recent Activities</h3>
            <div className="space-y-0 divide-y">
              {recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                  icon={activity.icon}
                  iconColor={activity.iconColor}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard 
          title="Revenue Overview"
          type="bar"
          data={revenueData}
        />
        <ChartCard 
          title="User Acquisition Sources"
          type="pie"
          data={userSourceData}
        />
      </div>
    </div>
  );
};

export default Index;
