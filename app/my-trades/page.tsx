"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveTradesList } from "@/components/my-trades/active-trades-list"
import { TradeHistoryList } from "@/components/my-trades/trade-history-list"
import { EarningsOverview } from "@/components/my-trades/earnings-overview"
import { Badge } from "@/components/ui/badge"
import { SettingsIcon } from "lucide-react"
import Link from "next/link"

export default function MyTradesPage() {
  const [currentTab, setCurrentTab] = useState("active")

  // Mock user data
  const user = {
    balance: 2540,
    invested: 1850,
    totalProfit: 387,
    activeTradersCount: 3,
    activeTradesCount: 7,
  }

  return (
    <div className="container px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Trades</h1>
          <p className="text-muted-foreground">Manage your portfolio and track your copy trading performance</p>
        </div>
        <Button variant="outline">
          <Link href="/settings" className="flex items-center">
            <SettingsIcon className="mr-2 h-4 w-4" /> Trading Settings
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Balance</CardDescription>
            <CardTitle className="text-2xl">{user.balance} APT</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Currently Invested</CardDescription>
            <CardTitle className="text-2xl">{user.invested} APT</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Profit/Loss</CardDescription>
            <CardTitle className="text-2xl text-secondary">+{user.totalProfit} APT</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Copy Trades</CardDescription>
            <CardTitle className="text-2xl">{user.activeTradesCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4" onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="active">
            Active Trades
            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
              {user.activeTradesCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
          <TabsTrigger value="earnings">Earnings Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <ActiveTradesList />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <TradeHistoryList />
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <EarningsOverview />
        </TabsContent>
      </Tabs>
    </div>
  )
}

