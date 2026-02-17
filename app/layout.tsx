import type { Metadata, Viewport } from 'next';
import './globals.css';

const name = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Collins Oseko';
const title = process.env.NEXT_PUBLIC_PORTFOLIO_TITLE || 'IT Undergraduate & Full-Stack Engineer';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.vercel.app';

export const metadata: Metadata = {
  title: `${name} — ${title}`,
  description: `Portfolio of ${name}, an ambitious IT undergraduate engineering intelligent digital systems. Explore projects, skills, and open-source work.`,
  keywords: ['portfolio', 'developer', 'full-stack', 'react', 'next.js', 'typescript', name],
  authors: [{ name }],
  creator: name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${name} — ${title}`,
    description: `Engineering digital systems with intelligence. Portfolio of ${name}.`,
    siteName: `${name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${name} — ${title}`,
    description: `Engineering digital systems with intelligence. Portfolio of ${name}.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#050810',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
