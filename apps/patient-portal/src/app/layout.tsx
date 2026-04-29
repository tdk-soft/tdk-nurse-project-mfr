import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Soins infirmiers à domicile Liège | Medinko Fotso Rosine",
  description: "Infirmière indépendante à Liège. Soins de plaies, injections, et soins d'hygiène à domicile. Disponible 7j/7.",
  keywords: ["infirmier domicile Liège", "soins infirmiers Liège", "Medinko Fotso Rosine"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}