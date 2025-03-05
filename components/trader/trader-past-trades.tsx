import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock past trades data
const pastTrades = [
  {
    id: "1",
    asset: "APT",
    entryPrice: 8.45,
    exitPrice: 10.32,
    profitLoss: 22.13,
    date: "2023-02-15",
    isProfit: true,
  },
  {
    id: "2",
    asset: "BTC",
    entryPrice: 42650,
    exitPrice: 45320,
    profitLoss: 6.26,
    date: "2023-02-10",
    isProfit: true,
  },
  {
    id: "3",
    asset: "ETH",
    entryPrice: 2210,
    exitPrice: 2090,
    profitLoss: -5.43,
    date: "2023-02-08",
    isProfit: false,
  },
  {
    id: "4",
    asset: "APT",
    entryPrice: 7.85,
    exitPrice: 8.45,
    profitLoss: 7.64,
    date: "2023-02-03",
    isProfit: true,
  },
  {
    id: "5",
    asset: "SOL",
    entryPrice: 98.32,
    exitPrice: 105.67,
    profitLoss: 7.48,
    date: "2023-01-29",
    isProfit: true,
  },
  {
    id: "6",
    asset: "BTC",
    entryPrice: 44320,
    exitPrice: 42650,
    profitLoss: -3.77,
    date: "2023-01-25",
    isProfit: false,
  },
  {
    id: "7",
    asset: "ETH",
    entryPrice: 1980,
    exitPrice: 2210,
    profitLoss: 11.61,
    date: "2023-01-20",
    isProfit: true,
  },
]

export function TraderPastTrades() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Exit Price</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastTrades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <img
                      src={`/placeholder.svg?height=30&width=30&text=${trade.asset}`}
                      alt={trade.asset}
                      className="h-6 w-6"
                    />
                  </div>
                  {trade.asset}
                </div>
              </TableCell>
              <TableCell>${trade.entryPrice.toLocaleString()}</TableCell>
              <TableCell>${trade.exitPrice.toLocaleString()}</TableCell>
              <TableCell className={trade.isProfit ? "text-secondary" : "text-destructive"}>
                {trade.isProfit ? "+" : ""}
                {trade.profitLoss}%
              </TableCell>
              <TableCell>{new Date(trade.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    trade.isProfit
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {trade.isProfit ? "Profit" : "Loss"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

