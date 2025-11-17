import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { ParticleBackground } from '@/components/layout/ParticleBackground';

export const metadata: Metadata = {
  title: 'Karma Ledger',
  description: 'A decentralized good deed recorder.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <ParticleBackground />
        <Header />
        <main className="relative z-10 container mx-auto px-4 py-24 md:py-28">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
