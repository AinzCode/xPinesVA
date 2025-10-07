import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from 'next/font/local';
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  description: "Professional Virtual Assistant services including General VA, Executive VA, Inside Sales Agents, and Medical Virtual Assistants. Transform your business with our expert VA solutions.",
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
        <Toaster />
        
        {/* Tawk.to Live Chat Widget */}
        <Script
          id="tawk-to-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68e52ea0e9dc6219554ac091/1j6vjs8mc';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
