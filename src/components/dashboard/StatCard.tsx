
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, change, className }: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-muted-foreground text-sm font-medium">{title}</span>
        <div className="p-2 rounded-md bg-muted/50">{icon}</div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold mb-1">{value}</span>
        {change && (
          <div className="flex items-center text-xs font-medium">
            <span 
              className={cn(
                change.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {change.positive ? "+" : ""}{change.value}
            </span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
