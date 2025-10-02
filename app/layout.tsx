import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const colmeak = localFont({
  src: '../public/fonts/Colmeak.otf',
  variable: '--font-colmeak',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pines VA - Pines Virtual Assistant Services",
  description: "Professional Virtual Assistant services including General VA, Executive VA, Inside Sales Agents, and Virtual Medical Assistants. Transform your business with our expert VA solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${colmeak.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
