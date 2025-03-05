"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  balance: 0,
  connect: async () => {},
  disconnect: () => {},
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    // Check if wallet was previously connected
    const savedWalletState = localStorage.getItem("walletConnected")
    if (savedWalletState === "true") {
      const savedAddress = localStorage.getItem("walletAddress")
      setIsConnected(true)
      setAddress(savedAddress)
      setBalance(Math.floor(Math.random() * 1000) + 500) // Mock balance
    }
  }, [])

  const connect = async (walletType: string) => {
    try {
      // Simulate wallet connection
      setIsConnected(true)

      // Generate a mock address
      const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`
      setAddress(mockAddress)

      // Set a mock balance
      setBalance(Math.floor(Math.random() * 1000) + 500)

      // Save to localStorage
      localStorage.setItem("walletConnected", "true")
      localStorage.setItem("walletAddress", mockAddress)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletType} wallet`,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(0)
    localStorage.removeItem("walletConnected")
    localStorage.removeItem("walletAddress")

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

