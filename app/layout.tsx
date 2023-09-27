import "./globals.css";
import type { Metadata } from "next";
import { MainSection, SubSection } from "./components/section";
import { Inter } from "next/font/google";
import { NetworkContextProvider } from "./hooks/useNetwork";
import { AccountContextProvider } from "./hooks/useAccount";

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
        <AccountContextProvider>
          <body className={inter.className}>
            <main className="flex min-h-screen flex-col items-center p-10">
              <SubSection>
                <div>SubSection</div>
              </SubSection>
              <MainSection>{children}</MainSection>
            </main>
          </body>
        </AccountContextProvider>
      </NetworkContextProvider>
    </html>
  );
}
