"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Provider } from "react-redux";

import createStore from "@/store/store";

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
  const store1 = createStore({
    activeTabKey: "trois",
    tokenKey: "sept",
    userKey: "mignonne",
  });

  const store2 = createStore({
    activeTabKey: "quatre",
    tokenKey: "deux",
    userKey: "mignon",
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex w-full">
              <Provider store={store1}>{children}</Provider>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center">
              <Provider store={store2}>{children}</Provider>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <Toaster />
      </body>
    </html>
  );
}
