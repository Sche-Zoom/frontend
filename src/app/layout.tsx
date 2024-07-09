import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import ClientMsw from "@/components/clientMsw";
import Header from "@/components/layout/header";
import Nav from "@/components/layout/nav";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, "antialiased")}>
        <ClientMsw />
        <Providers>
          <Header />

          <div className="relative flex">
            <Nav />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
