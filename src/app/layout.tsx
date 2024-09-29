import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "MyGPT",
  description: "MyGPT | Chat Powered by",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dracula">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
