"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"

// Mock active trades data
const activeTrades = [
  {
    id: "1",
    trader: {
      id: "1",
      name: "CryptoWhale",
      verified: true,
    },
    asset: "APT",
    entryPrice: 9.45,
    currentPrice: 10.32,
    profitLoss: 9.21,
    amount: 150,
    startDate: "2023-02-15",
    isProfit: true,
  },
  {
    id: "2",
    trader: {
      id: "2",
      name: "AptosKing",
      verified: true,
    },
    asset: "BTC",
    entryPrice: 43250,
    currentPrice: 42850,
    profitLoss: -0.93,
    amount: 0.05,
    startDate: "2023-02-12",
    isProfit: false,
  },
  {
    id: "3",
    trader: {
      id: "3",
      name: "TraderJoe",
      verified: false,
    },
    asset: "ETH",
    entryPrice: 2110,
    currentPrice: 2290,
    profitLoss: 8.53,
    amount: 0.75,
    startDate: "2023-02-08",
    isProfit: true,
  },
]

export function ActiveTradesList() {
  const [openTradeDetails, setOpenTradeDetails] = useState<string | null>(null)
  const [openExitConfirmation, setOpenExitConfirmation] = useState<string | null>(null)
  const { toast } = useToast()

  const handleExitTrade = (tradeId: string) => {
    toast({
      title: "Trade Exited",
      description: "Your trade has been successfully closed",
    })
    setOpenExitConfirmation(null)
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activeTrades.map((trade) => (
        <Card key={trade.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              <Link href={`/trader/${trade.trader.id}`} className="hover:underline flex items-center">
                {trade.trader.name}
                {trade.trader.verified && (
                  <Badge variant="outline" className="ml-2 h-5 bg-blue-50 text-blue-700 border-blue-200">
                    ✓
                  </Badge>
                )}
              </Link>
            </CardTitle>
            <Badge
              variant="outline"
              className={`flex items-center gap-1 ${
                trade.isProfit ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {trade.isProfit ? "+" : ""}
              {trade.profitLoss}%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <img
                    src={`/placeholder.svg?height=30&width=30&text=${trade.asset}`}
                    alt={trade.asset}
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <div className="font-medium">{trade.asset}</div>
                  <div className="text-xs text-muted-foreground">
                    {trade.amount} {trade.asset}
                  </div>
                </div>
              </div>
              <Dialog
                open={openTradeDetails === trade.id}
                onOpenChange={(open) => {
                  if (open) setOpenTradeDetails(trade.id)
                  else setOpenTradeDetails(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Trade Details</DialogTitle>
                    <DialogDescription>Active copy trade from {trade.trader.name}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Asset</div>
                      <div className="font-medium">{trade.asset}</div>
                      <div className="text-muted-foreground">Amount</div>
                      <div className="font-medium">
                        {trade.amount} {trade.asset}
                      </div>
                      <div className="text-muted-foreground">Entry Price</div>
                      <div className="font-medium">${trade.entryPrice.toLocaleString()}</div>
                      <div className="text-muted-foreground">Current Price</div>
                      <div className="font-medium">${trade.currentPrice.toLocaleString()}</div>
                      <div className="text-muted-foreground">Profit/Loss</div>
                      <div className={`font-medium ${trade.isProfit ? "text-secondary" : "text-destructive"}`}>
                        {trade.isProfit ? "+" : ""}
                        {trade.profitLoss}%
                      </div>
                      <div className="text-muted-foreground">Start Date</div>
                      <div className="font-medium">{new Date(trade.startDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <DialogFooter>
                    <AlertDialog
                      open={openExitConfirmation === trade.id}
                      onOpenChange={(open) => {
                        if (open) setOpenExitConfirmation(trade.id)
                        else setOpenExitConfirmation(null)
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Exit Trade</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Exit Trade</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to exit this trade now? This action cannot be undone.
                            {trade.isProfit
                              ? ` You will lock in a profit of ${trade.profitLoss}%.`
                              : ` You will realize a loss of ${trade.profitLoss}%.`}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleExitTrade(trade.id)}>Exit Trade</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="text-muted-foreground">Entry</div>
              <div className="text-right">${trade.entryPrice.toLocaleString()}</div>
              <div className="text-muted-foreground">Current</div>
              <div className="text-right">${trade.currentPrice.toLocaleString()}</div>
            </div>
            <div className="mt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="w-full">
                    Exit Trade
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Exit Trade</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to exit this trade now? This action cannot be undone.
                      {trade.isProfit
                        ? ` You will lock in a profit of ${trade.profitLoss}%.`
                        : ` You will realize a loss of ${trade.profitLoss}%.`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleExitTrade(trade.id)}>Exit Trade</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

