import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { ReactNode } from "react";
import ConfigurationButton from "./configurationButton";
import dynamic from "next/dynamic";

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

export const metadata: Metadata = {
  title: {
    template: "%s | Next Admin Dashboard Template",
    default: "Next Admin Dashboard Template",
  },
  description: "Our official Next Admin Dashboard Template website",
};

const Configurator = dynamic(() => import("@/components/configurator"), {
  loading: () => <p>loading ...</p>,
  ssr: false
});

const ErrorModal = dynamic(() => import("@/components/errorModal"), {
  loading: () => <></>,
  ssr: false
})

type _TRootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};
export default function RootLayout({
  children,
  modal,
}: Readonly<_TRootLayoutProps>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-neutral-900`}
      >
        <Providers
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorModal />
          {children}
          {modal}
          <ConfigurationButton />
          <Configurator />
        </Providers>
      </body>
    </html>
  );
}
