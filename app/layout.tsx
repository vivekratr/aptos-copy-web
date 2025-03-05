import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { WalletProvider } from "@/components/providers/wallet-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AptosCopy | AI-Powered Copy Trading",
  description: "Copy trade top performers on the Aptos blockchain with AI-powered insights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <WalletProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  )
}



import './globals.css'