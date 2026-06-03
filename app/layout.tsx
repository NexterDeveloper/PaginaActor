import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Aythami Hernandez | Actor',
    template: '%s | Aythami Hernandez',
  },
  description: 'Portfolio profesional de actor. Teatro, cine y televisión.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Aythami Hernandez Actor',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
