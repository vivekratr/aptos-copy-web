import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock trade history data
const tradeHistory = [
  {
    id: "1",
    trader: {
      id: "1",
      name: "CryptoWhale",
      verified: true,
    },
    asset: "APT",
    entryPrice: 7.45,
    exitPrice: 9.32,
    profitLoss: 25.1,
    amount: 200,
    startDate: "2023-01-15",
    endDate: "2023-02-10",
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
    entryPrice: 41250,
    exitPrice: 39850,
    profitLoss: -3.39,
    amount: 0.08,
    startDate: "2023-01-12",
    endDate: "2023-02-05",
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
    entryPrice: 1910,
    exitPrice: 2090,
    profitLoss: 9.42,
    amount: 1.2,
    startDate: "2023-01-08",
    endDate: "2023-01-28",
    isProfit: true,
  },
  {
    id: "4",
    trader: {
      id: "4",
      name: "CoinHunter",
      verified: true,
    },
    asset: "SOL",
    entryPrice: 85.75,
    exitPrice: 98.45,
    profitLoss: 14.81,
    amount: 15,
    startDate: "2023-01-05",
    endDate: "2023-01-25",
    isProfit: true,
  },
  {
    id: "5",
    trader: {
      id: "5",
      name: "BlockchainBaron",
      verified: false,
    },
    asset: "APT",
    entryPrice: 8.25,
    exitPrice: 7.85,
    profitLoss: -4.85,
    amount: 175,
    startDate: "2023-01-02",
    endDate: "2023-01-20",
    isProfit: false,
  },
]

export function TradeHistoryList() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trader</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Exit Price</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeHistory.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>
                <Link href={`/trader/${trade.trader.id}`} className="hover:underline flex items-center">
                  {trade.trader.name}
                  {trade.trader.verified && (
                    <Badge variant="outline" className="ml-2 h-5 bg-blue-50 text-blue-700 border-blue-200">
                      ✓
                    </Badge>
                  )}
                </Link>
              </TableCell>
              <TableCell>
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
              <TableCell>
                {trade.amount} {trade.asset}
              </TableCell>
              <TableCell className={trade.isProfit ? "text-secondary" : "text-destructive"}>
                {trade.isProfit ? "+" : ""}
                {trade.profitLoss}%
              </TableCell>
              <TableCell>
                {(() => {
                  const start = new Date(trade.startDate)
                  const end = new Date(trade.endDate)
                  const diffTime = Math.abs(end.getTime() - start.getTime())
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  return `${diffDays} days`
                })()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

