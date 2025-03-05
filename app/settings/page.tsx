"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { BellIcon, SaveIcon, ShieldIcon, UserIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const { toast } = useToast()

  // State for trading preferences
  const [defaultAmount, setDefaultAmount] = useState(100)
  const [riskLevel, setRiskLevel] = useState("medium")
  const [autoExit, setAutoExit] = useState(true)
  const [maxSlippage, setMaxSlippage] = useState(1)

  // State for notification preferences
  const [tradeExecutions, setTradeExecutions] = useState(true)
  const [profitAlerts, setProfitAlerts] = useState(true)
  const [newTraders, setNewTraders] = useState(false)
  const [marketUpdates, setMarketUpdates] = useState(false)

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="container px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Settings</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
        Manage your trading preferences, notification settings, and security options.
      </p>

      <Tabs defaultValue="trading" className="space-y-8">
        <TabsList>
          <TabsTrigger value="trading">
            <UserIcon className="h-4 w-4 mr-2" />
            Trading Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellIcon className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldIcon className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Trading Settings</CardTitle>
              <CardDescription>Set your default preferences for all copy trades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-amount">Default Investment Amount (APT)</Label>
                <Input
                  id="default-amount"
                  type="number"
                  value={defaultAmount}
                  onChange={(e) => setDefaultAmount(Number(e.target.value))}
                  min={10}
                  max={10000}
                />
                <p className="text-sm text-muted-foreground">
                  This amount will be pre-filled when setting up new copy trades
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="risk-level">Risk Level</Label>
                <Select value={riskLevel} onValueChange={setRiskLevel}>
                  <SelectTrigger id="risk-level">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">This affects the AI's trader recommendations for you</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-slippage">Maximum Slippage (%)</Label>
                  <span className="text-sm text-muted-foreground">{maxSlippage}%</span>
                </div>
                <Slider
                  id="max-slippage"
                  value={[maxSlippage]}
                  onValueChange={(values) => setMaxSlippage(values[0])}
                  min={0.1}
                  max={5}
                  step={0.1}
                />
                <p className="text-sm text-muted-foreground">Maximum allowed price difference when executing trades</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-exit" checked={autoExit} onCheckedChange={setAutoExit} />
                <Label htmlFor="auto-exit">Default Auto-Exit on Loss</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <SaveIcon className="mr-2 h-4 w-4" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="trade-executions">Trade Executions</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your copy trades are executed</p>
                </div>
                <Switch id="trade-executions" checked={tradeExecutions} onCheckedChange={setTradeExecutions} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profit-alerts">Profit/Loss Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about significant P&L changes</p>
                </div>
                <Switch id="profit-alerts" checked={profitAlerts} onCheckedChange={setProfitAlerts} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-traders">New Top Traders</Label>
                  <p className="text-sm text-muted-foreground">Get notified when AI detects new promising traders</p>
                </div>
                <Switch id="new-traders" checked={newTraders} onCheckedChange={setNewTraders} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="market-updates">Market Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive general market information and news</p>
                </div>
                <Switch id="market-updates" checked={marketUpdates} onCheckedChange={setMarketUpdates} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                <SaveIcon className="mr-2 h-4 w-4" /> Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your wallet connection and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Connected Wallet</Label>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <img src="/placeholder.svg?height=30&width=30" alt="Wallet" className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Petra Wallet</p>
                      <p className="text-sm text-muted-foreground">0x1a2b...3c4d</p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    Disconnect
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Transaction Signing</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="transaction-confirm" defaultChecked={true} />
                  <Label htmlFor="transaction-confirm">Always confirm transactions</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, you'll need to manually approve all transactions
                </p>
              </div>

              <div className="space-y-2">
                <Label>Activity Logs</Label>
                <Button variant="outline" className="w-full">
                  View Activity Logs
                </Button>
                <p className="text-sm text-muted-foreground">Review all actions taken on your account</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

