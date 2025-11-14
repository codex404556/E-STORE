import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: {
    template: "%s - E-Store online store",
    default: "E-Store online store",
  },
  description: "E-store is an online store for all your needs.",
  icons: {
    icon: "/favicon.svg", // Modern browsers
    shortcut: "/favicon.svg", // Legacy browsers
    apple: "/favicon.svg", // Apple devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
    </ClerkProvider>
  );
}
