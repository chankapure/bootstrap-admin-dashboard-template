
import React from 'react';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconColor?: string;
}

const ActivityItem = ({
  title,
  description,
  time,
  icon,
  iconColor = "bg-primary/10 text-primary",
}: ActivityItemProps) => {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className={cn("p-2 rounded-md shrink-0", iconColor)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
