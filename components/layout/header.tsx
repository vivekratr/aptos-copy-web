"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { Menu } from "lucide-react"
import { useWallet } from "@/components/providers/wallet-provider"
import { UserAccountNav } from "@/components/wallet/user-account-nav"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "My Trades", href: "/my-trades" },
  { name: "Settings", href: "/settings" },
  { name: "Help", href: "/help" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isConnected } = useWallet()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/placeholder.svg?height=32&width=32" alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">AptosCopy</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isConnected ? <UserAccountNav /> : <ConnectWalletButton />}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="flex flex-col gap-4 px-4">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <img src="/placeholder.svg?height=32&width=32" alt="Logo" className="h-8 w-8" />
                  <span className="font-bold text-xl">AptosCopy</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

