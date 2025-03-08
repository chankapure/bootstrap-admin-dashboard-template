
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar' | 'area' | 'pie';
  data: any[];
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartCard = ({ title, type, data, className }: ChartCardProps) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
              <Bar dataKey="value" fill="hsl(var(--accent))" barSize={30} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <div className="p-5">
        <h3 className="text-base font-medium mb-4">{title}</h3>
        {renderChart()}
      </div>
    </Card>
  );
};

export default ChartCard;
