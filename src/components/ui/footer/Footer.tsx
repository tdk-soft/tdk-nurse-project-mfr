import React from 'react';
import { cn } from '@/utils/cn';

interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

export const Footer = ({ className, children }: FooterProps) => {
  return (
    <div className={cn('p-4', className)}>
      {children || 'Footer Component'}
    </div>
  );
};
