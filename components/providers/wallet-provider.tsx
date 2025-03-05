"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
// Remove unused imports
// import {
//   AptosWalletAdapterProvider,
//   useWallet as useAptosWallet,
// } from "@aptos-labs/wallet-adapter-react"
// import { PetraWallet } from "petra-plugin-wallet-adapter"
// import aptos from "aptos"

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

// This is our custom provider that directly uses the Petra wallet
export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const { toast } = useToast()
  
  // Check if wallet is connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.aptos) {
        try {
          const isConnected = await window.aptos.isConnected()
          if (isConnected) {
            const account = await window.aptos.account()
            setAddress(account.address)
            setIsConnected(true)
            // For now, we'll use a mock balance
            setBalance(Math.floor(Math.random() * 1000) + 500)
          }
        } catch (error) {
          console.error("Failed to auto-connect wallet:", error)
        }
      }
    }
    
    checkConnection()
  }, [])

  // Fixed the connect function - it was missing its implementation
  const connect = async (walletType: string) => {
    try {
      if (typeof window === 'undefined' || !window.aptos) {
        toast({
          title: "Wallet Not Found",
          description: "Please install the Petra Wallet extension",
          variant: "destructive",
        })
        return
      }

      const response = await window.aptos.connect()
      setAddress(response.address)
      setIsConnected(true)
      
      // Set a mock balance for now
      setBalance(Math.floor(Math.random() * 1000) + 500)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletType} wallet`,
      })
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Fixed the disconnect function - it was not properly closed
  const disconnect = async () => {
    try {
      if (typeof window !== 'undefined' && window.aptos) {
        await window.aptos.disconnect()
      }
      
      setIsConnected(false)
      setAddress(null)
      setBalance(0)
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      })
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected, 
        address, 
        balance, 
        connect, 
        disconnect 
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Add TypeScript interface for the Petra wallet
declare global {
  interface Window {
    aptos?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
      account: () => Promise<{ address: string }>;
    };
  }
}

