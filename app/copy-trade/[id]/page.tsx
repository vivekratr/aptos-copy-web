"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, InfoIcon, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CopyTradeSetupPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const traderId = params.id

  // State for form values
  const [investmentAmount, setInvestmentAmount] = useState(100)
  const [stopLoss, setStopLoss] = useState(10)
  const [maxInvestment, setMaxInvestment] = useState(25)
  const [autoExit, setAutoExit] = useState(true)

  // Mock trader data
  const trader = {
    id: traderId,
    name: "CryptoWhale",
    winRate: 76,
    totalPnL: "+437%",
    riskLevel: "Medium",
    totalTrades: 172,
  }

  const handleSubmit = () => {
    // Show confirmation toast
    toast({
      title: "Copy Trade Confirmed!",
      description: `You are now copying ${trader.name} with $${investmentAmount}`,
      action: (
        <Button variant="outline" size="sm" onClick={() => router.push("/my-trades")}>
          View My Trades
        </Button>
      ),
    })

    // Redirect to tracking page
    router.push("/my-trades")
  }

  return (
    <div className="container px-4 md:px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Set Up Copy Trading</h1>

        <Alert className="mb-8">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            You're about to start copy trading. Make sure you understand the risks involved.
          </AlertDescription>
        </Alert>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Selected Trader</CardTitle>
              <CardDescription>You're about to copy trades from this trader</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <img src="/placeholder.svg?height=60&width=60" alt={trader.name} className="h-12 w-12 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{trader.name}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Win Rate: {trader.winRate}%
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {trader.totalTrades} trades · {trader.riskLevel} risk · {trader.totalPnL} total PnL
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trade Settings</CardTitle>
              <CardDescription>Configure how much you want to invest and risk management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Invest (APT)</Label>
                <div className="flex gap-4">
                  <Input
                    id="amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    min={10}
                    max={10000}
                  />
                  <Button variant="outline" onClick={() => setInvestmentAmount(100)}>
                    100 APT
                  </Button>
                  <Button variant="outline" onClick={() => setInvestmentAmount(500)}>
                    500 APT
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="stop-loss">Stop-Loss (%)</Label>
                  <span className="text-sm text-muted-foreground">{stopLoss}%</span>
                </div>
                <Slider
                  id="stop-loss"
                  value={[stopLoss]}
                  onValueChange={(values) => setStopLoss(values[0])}
                  min={5}
                  max={50}
                  step={1}
                />
                <p className="text-sm text-muted-foreground">
                  Automatically exit position if loss exceeds this percentage
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-investment">Max Investment Per Trade (%)</Label>
                  <span className="text-sm text-muted-foreground">{maxInvestment}%</span>
                </div>
                <Slider
                  id="max-investment"
                  value={[maxInvestment]}
                  onValueChange={(values) => setMaxInvestment(values[0])}
                  min={5}
                  max={100}
                  step={5}
                />
                <p className="text-sm text-muted-foreground">Maximum percentage of your total amount used per trade</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-exit" checked={autoExit} onCheckedChange={setAutoExit} />
                <Label htmlFor="auto-exit">Auto-Exit on Loss</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground flex items-center">
                <Lock className="h-4 w-4 mr-1" /> Secure Transaction
              </div>
              <Button onClick={handleSubmit} className="bg-secondary hover:bg-secondary/90 text-black font-semibold">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm & Copy
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

