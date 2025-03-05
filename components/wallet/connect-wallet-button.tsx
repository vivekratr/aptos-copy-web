"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { useWallet } from "@/components/providers/wallet-provider"
// Remove the problematic import
// import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { UserAccountNav } from "@/components/wallet/user-account-nav"

export function ConnectWalletButton() {
  const [open, setOpen] = useState(false)
  const { connect, isConnected } = useWallet()

  const handleConnect = async () => {
    await connect("petra")
    setOpen(false)
  }

  // If already connected, show the account nav instead
  if (isConnected) {
    return <UserAccountNav />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90 text-black font-semibold">Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Select a wallet to connect to the platform</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted transition-colors"
            onClick={handleConnect}
          >
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <img src="/petra-logo.svg" alt="Petra" className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Petra Wallet</h4>
              <p className="text-sm text-muted-foreground">Connect to Petra Wallet</p>
            </div>
          </Card>
        </div>
        <div className="flex justify-center">
          <a href="https://petra.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
            Don&apos;t have a wallet? Learn how to set one up
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

