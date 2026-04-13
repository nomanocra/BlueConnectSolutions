import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { Providers } from './providers';
import type { Locale } from '@/lib/i18n/translations';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://blueconnectsolutions.tech'),
  title: 'BlueConnectSolutions',
  description: 'Driving the next wave of Digital Transformation',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'BlueConnectSolutions',
    description: 'Driving the next wave of Digital Transformation - IoT, Cybersecurity & Video Broadcasting',
    type: 'website',
    url: 'https://blueconnectsolutions.tech',
    locale: 'en_US',
    images: [
      {
        url: '/logo2.png',
        width: 512,
        height: 512,
        alt: 'BlueConnectSolutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'BlueConnectSolutions',
    description: 'Driving the next wave of Digital Transformation',
    images: ['/logo2.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const locale: Locale = localeCookie === 'fr' ? 'fr' : 'en';

  return (
    <html lang={locale} className={GeistSans.variable}>
      <body className="antialiased">
        <Script
          id="prevent-scroll-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              if (window.scrollY !== 0) {
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
