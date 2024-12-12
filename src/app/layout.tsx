"use client";

import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/hooks/userProvider";
import { Toaster } from "@/components/ui/toaster";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Provider } from "react-redux";

import { store1, store2 } from "@/store/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen`}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-lg border md:min-w-[450px] w-full h-full"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center">
              <Provider store={store1}>
                <UserProvider index={1}>{children}</UserProvider>
              </Provider>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center">
              <Provider store={store2}>
                <UserProvider index={2}>{children}</UserProvider>
              </Provider>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <Toaster />
      </body>
    </html>
  );
}
