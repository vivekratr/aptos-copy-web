import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ArrowUpRight, BarChart3 } from "lucide-react"

interface TraderStatsProps {
  trader: {
    winRate: number
    totalPnL: string
    riskLevel: string
    totalTrades: number
    avgTradeTime: string
  }
}

export function TraderStats({ trader }: TraderStatsProps) {
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "high":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return ""
    }
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-muted-foreground">
              <Award className="h-4 w-4 mr-2" /> Win Rate
            </div>
            <div className="text-2xl font-bold">{trader.winRate}%</div>
            <div className="text-sm text-muted-foreground">Success rate across all trades</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 mr-2" /> Total PnL
            </div>
            <div className="text-2xl font-bold text-secondary">{trader.totalPnL}</div>
            <div className="text-sm text-muted-foreground">Profit and loss since inception</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-muted-foreground">
              <BarChart3 className="h-4 w-4 mr-2" /> Risk Level
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{trader.riskLevel}</div>
              <Badge variant="outline" className={getRiskBadgeColor(trader.riskLevel)}>
                {trader.riskLevel}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">Based on trading patterns</div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

