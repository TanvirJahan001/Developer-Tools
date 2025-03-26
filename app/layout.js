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
  description: "Your all-in-one toolkit for modern web development",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: 'fdkb5VGvlExhGxD_VntG0ZBczF3Ay4B4su0LtqcNvKc',
  },
  alternates: {
    canonical: 'https://developer-tools-alpha.vercel.app',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
    <meta name="google-site-verification" content="fdkb5VGvlExhGxD_VntG0ZBczF3Ay4B4su0LtqcNvKc" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}

