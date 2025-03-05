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

export function ConnectWalletButton() {
  const [open, setOpen] = useState(false)
  const { connect } = useWallet()

  const handleConnect = async (walletType: string) => {
    await connect(walletType)
    setOpen(false)
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
            onClick={() => handleConnect("Petra")}
          >
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <img src="/placeholder.svg?height=30&width=30&text=P" alt="Petra" className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Petra Wallet</h4>
              <p className="text-sm text-muted-foreground">Connect to Petra Wallet</p>
            </div>
          </Card>

          <Card
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleConnect("Martian")}
          >
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <img src="/placeholder.svg?height=30&width=30&text=M" alt="Martian" className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Martian Wallet</h4>
              <p className="text-sm text-muted-foreground">Connect to Martian Wallet</p>
            </div>
          </Card>

          <Card
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleConnect("Rise")}
          >
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <img src="/placeholder.svg?height=30&width=30&text=R" alt="Rise" className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Rise Wallet</h4>
              <p className="text-sm text-muted-foreground">Connect to Rise Wallet</p>
            </div>
          </Card>
        </div>
        <div className="flex justify-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Don&apos;t have a wallet? Learn how to set one up
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

