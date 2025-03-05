"use client"

import Link from "next/link"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"

// Change from named export to default export
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-2 flex items-center space-x-2">
            {/* Replace the text with the logo image */}
            <img
              src="https://i.imgur.com/30dS9w2.png"
              alt="AptoTrade Logo"
              className="h-6 w-auto"
            />
          </Link>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">AptoTrade</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              href="/copy-trade"
              className="mx-4 text-sm font-medium transition-colors hover:text-primary"
            >
              Copy Trade
            </Link>
            <Link
              href="/help"
              className="mx-4 text-sm font-medium transition-colors hover:text-primary"
            >
              Help
            </Link>
          </nav>
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}

