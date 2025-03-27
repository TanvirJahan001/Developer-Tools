import { GA_TRACKING_ID } from '@/lib/analytics';
import { Geist, Geist_Mono } from "next/font/google";
import { AnimationProvider } from "../components/AnimationProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Developer Tools - All-in-One Solution",
  description: "Your all-in-one toolkit for modern web development featuring code formatting, data conversion, security tools, and more",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: 'fdkb5VGvlExhGxD_VntG0ZBczF3Ay4B4su0LtqcNvKc',
    
  },
  alternates: {
    canonical: 'https://developer-tools-alpha.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://developer-tools-alpha.vercel.app',
    siteName: 'Developer Tools',
    title: 'Developer Tools - All-in-One Solution',
    description: 'Your all-in-one toolkit for modern web development',
    images: [
      {
        url: 'https://developer-tools-alpha.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Developer Tools Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools - All-in-One Solution',
    description: 'Your all-in-one toolkit for modern web development',
    images: ['https://developer-tools-alpha.vercel.app/twitter-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  keywords: 'developer tools, code formatter, JSON prettifier, data conversion, security tools, web development',
  authors: [{ name: 'Ash Sams Md Tanvir Jahan' }],
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}

