import React from 'react';
import { cn } from '@/utils/cn';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export const ServiceCard = ({ title, description, icon, className }: ServiceCardProps) => {
  return (
    <div className={cn(
      "p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group",
      className
    )}>
      <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};