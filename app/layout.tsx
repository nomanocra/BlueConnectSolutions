import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blue Connect Solutions',
  description: 'Driving the next wave of Digital Transformation',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Blue Connect Solutions',
    description: 'Driving the next wave of Digital Transformation - IoT, Cybersecurity & Video Broadcasting',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Blue Connect Solutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Blue Connect Solutions',
    description: 'Driving the next wave of Digital Transformation',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="antialiased">
        <Script
          id="prevent-scroll-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              // Forcer le scroll à 0 seulement une fois au chargement initial
              if (window.scrollY !== 0) {
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
