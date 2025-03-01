
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
  isGlass?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  className,
  children,
  noPadding = false,
  isGlass = false,
}) => {
  return (
    <div 
      className={cn(
        "rounded-xl border shadow-sm transition-all",
        isGlass ? "glass-effect" : "bg-card",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className={cn(!noPadding && "p-6")}>{children}</div>
    </div>
  );
};

export default DashboardCard;
