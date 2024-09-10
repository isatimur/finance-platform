import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { QueryProviders } from "@/providers/query-provider";

import { SheetProvider } from "@/providers/sheet-provider";
import "./globals.css";


export const metadata: Metadata = {
  title: "Finance Platform",
  description: "with power of AI managing money becomes easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <QueryProviders>
            <SheetProvider />
            {children}
          </QueryProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
