"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/components/providers/wallet-provider"
import { LogOut, UserIcon, Settings, Wallet, Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export function UserAccountNav() {
  const { address, balance, disconnect } = useWallet()
  const { toast } = useToast()

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <UserIcon className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Wallet</p>
            <p className="text-xs leading-none text-muted-foreground flex items-center">
              {address}
              <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-4 w-4 ml-1">
                <Copy className="h-3 w-3" />
              </Button>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <Wallet className="mr-2 h-4 w-4" />
          <span>{balance} APT</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-trades" className="flex items-center cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>My Trades</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center cursor-pointer text-destructive focus:text-destructive"
          onClick={disconnect}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

