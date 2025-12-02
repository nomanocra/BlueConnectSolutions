import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blue Connect Solutions',
  description: 'Driving the next wave of Digital Transformation',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={GeistSans.variable}>
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
        {children}
      </body>
    </html>
  );
}
