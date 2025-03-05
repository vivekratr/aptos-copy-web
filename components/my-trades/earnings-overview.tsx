"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Generate mock earnings data
const generateEarningsData = () => {
  // Daily data for the last 7 days
  const dailyData = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    dailyData.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      profit: Math.random() * 50 - 10, // Random value between -10 and 40
    })
  }

  // Weekly data for the last 4 weeks
  const weeklyData = []
  for (let i = 3; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i * 7)

    weeklyData.push({
      date: `Week ${4 - i}`,
      profit: Math.random() * 200 - 50, // Random value between -50 and 150
    })
  }

  // Monthly data for the last 6 months
  const monthlyData = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)

    monthlyData.push({
      date: date.toLocaleDateString("en-US", { month: "short" }),
      profit: Math.random() * 500 - 100, // Random value between -100 and 400
    })
  }

  return { dailyData, weeklyData, monthlyData }
}

const { dailyData, weeklyData, monthlyData } = generateEarningsData()

export function EarningsOverview() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>Track your copy trading performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="space-y-4">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value} APT`} />
                    <Tooltip
                      formatter={(value: any) => [`${value.toFixed(2)} APT`, "Profit/Loss"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        padding: "0.5rem",
                      }}
                    />
                    <Bar
                      dataKey="profit"
                      fill={(data) => (data.profit >= 0 ? "#10B981" : "#EF4444")}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value} APT`} />
                    <Tooltip
                      formatter={(value: any) => [`${value.toFixed(2)} APT`, "Profit/Loss"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        padding: "0.5rem",
                      }}
                    />
                    <Bar
                      dataKey="profit"
                      fill={(data) => (data.profit >= 0 ? "#10B981" : "#EF4444")}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value} APT`} />
                    <Tooltip
                      formatter={(value: any) => [`${value.toFixed(2)} APT`, "Profit/Loss"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        padding: "0.5rem",
                      }}
                    />
                    <Bar
                      dataKey="profit"
                      fill={(data) => (data.profit >= 0 ? "#10B981" : "#EF4444")}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Traders</CardTitle>
            <CardDescription>Traders who have generated the most profit for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "CryptoWhale", profit: 437, trades: 12 },
                { name: "AptosKing", profit: 326, trades: 8 },
                { name: "TraderJoe", profit: 218, trades: 15 },
              ].map((trader, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{trader.name}</p>
                      <p className="text-xs text-muted-foreground">{trader.trades} trades</p>
                    </div>
                  </div>
                  <p className="text-secondary font-medium">+{trader.profit} APT</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Assets</CardTitle>
            <CardDescription>Assets that have generated the most profit for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { asset: "APT", profit: 587, trades: 18 },
                { asset: "BTC", profit: 326, trades: 5 },
                { asset: "ETH", profit: 218, trades: 9 },
              ].map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <img
                        src={`/placeholder.svg?height=30&width=30&text=${asset.asset}`}
                        alt={asset.asset}
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{asset.asset}</p>
                      <p className="text-xs text-muted-foreground">{asset.trades} trades</p>
                    </div>
                  </div>
                  <p className="text-secondary font-medium">+{asset.profit} APT</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

