import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import './globals.css';
import { cn } from '@/lib/utils';
import AudioPlayer from '@/components/layout/audio-player';

export const metadata: Metadata = {
  title: 'FC_ADVENTURES',
  description: 'Your gateway to Kenyan adventures.',
  manifest: '/manifest.json',
  icons: {
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: '#A67B5B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'font-body antialiased min-h-screen flex flex-col',
        )}
      >
        <Header />
        <main className="flex-grow animate-fade-in">{children}</main>
        <Footer />
        <Toaster />
  <AudioPlayer src="/music/bengicela.mp3" />
      </body>
    </html>
  );
}
