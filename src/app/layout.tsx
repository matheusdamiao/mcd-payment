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
            "AYyfpJk16czBfj5cm8lfjbhH0gfxZibTfsHLY-5uEwphLpUnYNA1s0QI76mdixMeiKI9ErSDd3OK5hoY",
          currency: "BRL",
        }}
      >
        <body className={inter.className}>{children}</body>
      </PayPalScriptProvider>
    </html>
  );
}
