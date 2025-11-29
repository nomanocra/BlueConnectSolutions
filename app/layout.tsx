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
              window.scrollTo(0, 0);
              // Forcer plusieurs fois pour être sûr
              setTimeout(function() { window.scrollTo(0, 0); }, 0);
              setTimeout(function() { window.scrollTo(0, 0); }, 10);
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
