"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TraderPastTrades } from "@/components/trader/trader-past-trades"
import { TraderStats } from "@/components/trader/trader-stats"
import { TraderPerformanceChart } from "@/components/trader/trader-performance-chart"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CopyIcon, ExternalLink } from "lucide-react"
import { useParams } from "next/navigation"

export default function TraderProfilePage() {
  const params = useParams()
  const traderId = params.id

  // Mock trader data
  const trader = {
    id: traderId,
    name: "CryptoWhale",
    address: "0x1a2b...3c4d",
    avatar: "/placeholder.svg?height=100&width=100",
    winRate: 76,
    totalPnL: "+437%",
    riskLevel: "Medium",
    totalTrades: 172,
    avgTradeTime: "4.2 days",
    topAssets: ["APT", "BTC", "ETH"],
    verified: true,
    joinedDate: "Sep 2023",
  }

  return (
    <div className="container px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">{trader.name}</h1>
            {trader.verified && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{trader.address}</span>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90 text-black font-semibold">
          <Link href={`/copy-trade/${traderId}`} className="flex items-center">
            <CopyIcon className="mr-2 h-4 w-4" /> Start Copy Trading
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <TraderStats trader={trader} />
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trades">Past Trades</TabsTrigger>
          <TabsTrigger value="assets">Top Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription>Trader's performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <TraderPerformanceChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Trades</CardTitle>
              <CardDescription>History of all completed trades</CardDescription>
            </CardHeader>
            <CardContent>
              <TraderPastTrades />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Traded Assets</CardTitle>
              <CardDescription>Assets this trader specializes in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trader.topAssets.map((asset, index) => (
                  <Card key={index} className="flex items-center p-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      <img src={`/placeholder.svg?height=40&width=40&text=${asset}`} alt={asset} className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-medium">{asset}</h3>
                      <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 50) + 10}% of trades</p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

