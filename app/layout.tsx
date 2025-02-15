"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { UserContext } from "@/types";
import { PreFillForm } from "@/components/shared/PreFillForm";
import { Layout } from "@/components/Layout/Layout";
import { AppContext } from "@/hooks/useAppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userContext, setUserContext] = useState<UserContext | null>(null);

  const onError = (message: string) => {
    toast.error(message);
  };

  const onSuccess = (message: string) => {
    toast.success(message);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContext.Provider
          value={{ userContext, setUserContext, onError, onSuccess }}
        >
          <Toaster position="top-right" />
          <div className="min-h-screen bg-background text-white">
            {!userContext ? (
              <div className="min-h-screen bg-background text-white p-4">
                <PreFillForm onSubmit={(context) => setUserContext(context)} />
              </div>
            ) : (
              <>
                <Layout>{children}</Layout>
              </>
            )}
          </div>
        </AppContext.Provider>
      </body>
    </html>
  );
}
