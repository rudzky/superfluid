import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import "./globals.css";
import "remixicon/fonts/remixicon.css";

const interDisplay = localFont({
  src: "../fonts/InterDisplay-Medium.woff2",
  display: "swap",
  variable: "--font-inter-display",
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.className} ${interDisplay.variable} ${inter.variable}`}
      >
        <body>
          {children}
          <Toaster richColors position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
