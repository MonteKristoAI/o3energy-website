import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://o3energy.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'O3 Energy | Commercial & Utility-Scale Solar EPC | Dallas, TX',
  description:
    'Texas-based solar EPC partner for 100 kW to 10 MW commercial, government, and utility-scale projects. Operating since 2011 across the US and the Pacific Islands.',
  openGraph: {
    title: 'O3 Energy | Commercial & Utility-Scale Solar EPC',
    description: 'Commercial and utility-scale solar EPC since 2011. Four offices across the US and the Pacific Islands.',
    siteName: 'O3 Energy',
    url: siteUrl,
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <body className="antialiased min-h-[100dvh] flex flex-col bg-bg-cream text-text-1 font-body">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
