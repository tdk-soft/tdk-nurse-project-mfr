import React from 'react';
import { cn } from '@/utils/cn';

interface HeroProps {
  title: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
}

export const Hero = ({ title, subtitle, className, children }: HeroProps) => {
  return (
    <section className={cn('py-20 lg:py-32 px-4', className)}>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-slate-600 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
};