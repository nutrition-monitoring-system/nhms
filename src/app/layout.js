import { Inter } from "next/font/google";
import "./globals.css";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome",
  description: "Landing Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        {children}
        <SpeedInsights></SpeedInsights>
        <Analytics />
      </body>
    </html>
  );
}
