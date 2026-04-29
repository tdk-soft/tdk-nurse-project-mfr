import React from 'react';
import { cn } from '@/utils/cn';

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <nav className={cn("w-full py-4 px-6 flex justify-between items-center", className)}>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold">
          MFR
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">
          mfr<span className="text-sky-600">-care</span>
        </span>
      </div>

      <div className="hidden md:flex gap-8 font-medium text-slate-600">
        <a href="#" className="hover:text-sky-600 transition-colors">Accueil</a>
        <a href="#" className="hover:text-sky-600 transition-colors">Soins</a>
        <a href="#" className="hover:text-sky-600 transition-colors">Zone d`&apos;`intervention</a>
      </div>

      <a 
        href="tel:+32400000000" 
        className="bg-sky-600 text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-sky-700 transition-all flex items-center gap-2"
      >
        <span className="hidden sm:inline text-sm">Appeler Medinko</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </nav>
  );
};