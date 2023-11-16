"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <PayPalScriptProvider
        options={{
          clientId:
            "AVY8RdUVR8_xH2haQY_xgmGRuGyCTgcZxH-qjjFLacCPfve-nLd9inK35SHhCB5vyzmlAgx-jC74N-M_",
          currency: "USD",
        }}
      >
        <body className={inter.className}>{children}</body>
      </PayPalScriptProvider>
    </html>
  );
}
