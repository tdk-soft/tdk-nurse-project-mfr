import React from 'react';
import { Navbar } from '@/components/ui/navbar/Navbar';
import { Hero } from '@/components/sections/hero/Hero';
import { ServiceCard } from '@/components/ui/service-card/ServiceCard';
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar className="nav-glass" />

      <main>
        {/* HERO SECTION */}
        <Hero 
          title="Soins infirmiers à Liège"
          subtitle="Medinko Fotso Rosine : Une expertise médicale humaine et professionnelle au service de votre santé, 7j/7 dans toute la région liégeoise."
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/appointment" className="btn-primary">Prendre rendez-vous</Link>
            <a href="#services" className="btn-outline">Nos soins</a>
          </div>
        </Hero>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Une gamme complète de soins</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Disponibilité et professionnalisme pour assurer votre maintien à domicile dans les meilleures conditions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard 
                title="Soins d'Hygiène"
                description="Aide à la toilette, habillage et soins de confort dans le respect de la dignité."
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              />
              <ServiceCard 
                title="Injections"
                description="Prises de sang, insulinothérapie et administration de médicaments par voie injectable."
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-1.6-1.6c-1-1-1-2.5 0-3.4L14 4"/><path d="m9 11 3 3"/><path d="m5 19-3 3"/></svg>}
              />
              <ServiceCard 
                title="Soins de Plaies"
                description="Pansements simples et complexes, soins post-opératoires et suivi de cicatrisation."
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>}
              />
              <ServiceCard 
                title="Suivi Diabétique"
                description="Surveillance de la glycémie et éducation thérapeutique pour une autonomie maîtrisée."
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M5 12h14"/></svg>}
              />
            </div>
          </div>
        </section>

        {/* ZONE D'INTERVENTION */}
        <section className="py-20 bg-sky-900 text-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-6">Zone d`&apos;`intervention à Liège</h2>
              <p className="text-sky-100 text-lg mb-8">
                Basée à Liège, Medinko se déplace rapidement dans toute la région : 
                <span className="font-semibold text-white"> Herstal, Ans, Grivegnée, Angleur, Chênée et Liège-Centre.</span>
              </p>
              <div className="flex items-center gap-4 text-sky-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <span>Disponible 7j/7, dimanches et jours fériés inclus.</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-slate-900 w-full max-w-sm">
              <h3 className="text-xl font-bold mb-4">Un besoin urgent ?</h3>
              <p className="text-slate-600 mb-6">Contactez Medinko Fotso Rosine directement par téléphone.</p>
              <a href="tel:+32400000000" className="w-full btn-primary inline-block text-center">
                Appeler maintenant
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} MFR-CARE - Medinko Fotso Rosine. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}