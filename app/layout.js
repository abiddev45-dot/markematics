import "./globals.css";
import { Archivo, DM_Sans, JetBrains_Mono } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Header, Nav } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Loader } from "@/components/site/loader";
import { LoadingProvider } from "@/components/site/loading-context";
import { SmoothScroll } from "@/components/site/smooth-scroll";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Markematics - Market Research & Consulting, Karachi",
  description:
    "Full-service market research and consulting since 2011. Retail audits, brand tracking, advanced analytics and research technology across Pakistan.",
  authors: [
    {
      name: "Markematics",
    },
  ],
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicons/site.webmanifest",
  openGraph: {
    title: "Markematics - Market Research & Consulting",
    description:
      "Turning markets into measurable intelligence. 130+ clients, 700+ projects, 10 offices across Pakistan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${archivo.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full">
        <TooltipProvider>
          <LoadingProvider>
            <SmoothScroll />
            <Loader />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LoadingProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
