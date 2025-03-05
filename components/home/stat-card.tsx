import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  trend: string
}

export function StatCard({ title, value, trend }: StatCardProps) {
  const isPositive = trend.startsWith("+")

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={`flex items-center text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {trend}
          </div>
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

