import type { Metadata } from "next";
import { Inter, Katibeh } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "./providers";
import { headers } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://readre.vercel.app'),
  title: {
    template: '%s | Readre',
    default: 'Readre',
  },
  description: "you can read and write here",
  keywords: ['blog', 'reading', 'writing', 'technical contents'],
  authors: [{ name: 'drimes' }],
  creator: 'drimes',
  publisher: 'Readre',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://readre.vercel.app',
    siteName: 'Readre',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Readre',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Readre',
    description: 'you can read and write here',
    creator: '@drimesbot',
    images: ['/og-image.png'],
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
  verification: {
    google: '365b4a61b679a39d',
    // other verification codes as needed
  },
};

const cookie = headers().get("cookie");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
     <body className={inter.className}>
     <Providers>{children}</Providers></body>
    </html>
  );
}