import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blue Connect Solutions',
  description: 'Driving the next wave of Digital Transformation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${inter.variable}`}>
      <body className="font-geist antialiased bg-background-1 text-foreground-main">
        {children}
      </body>
    </html>
  );
}
