import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NetworkContextProvider } from "./hooks/useNetwork";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUDT Management",
  description:
    "This is a demo built on Kuai Framework, do not use in production directly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NetworkContextProvider>
        <body className={inter.className}>{children}</body>
      </NetworkContextProvider>
    </html>
  );
}
