import type { Metadata } from "next";
import { montserrat } from './fonts/fonts';
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Tenantopia",
  description: "A modern tenants and property management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider >
    <html lang="en">
      <body
        className={montserrat.className}
      >
        {children}
      </body>
    </html>
    </SessionProvider>
  );
}
