"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyIcon, ExternalLink, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock traders data
const traders = [
  {
    id: "1",
    name: "CryptoWhale",
    address: "0x1a2b...3c4d",
    winRate: 76,
    roi: 437,
    riskLevel: "Medium",
    totalTrades: 172,
    verified: true,
  },
  {
    id: "2",
    name: "AptosKing",
    address: "0x2b3c...4d5e",
    winRate: 82,
    roi: 326,
    riskLevel: "High",
    totalTrades: 98,
    verified: true,
  },
  {
    id: "3",
    name: "TraderJoe",
    address: "0x3c4d...5e6f",
    winRate: 71,
    roi: 218,
    riskLevel: "Medium",
    totalTrades: 143,
    verified: false,
  },
  {
    id: "4",
    name: "CoinHunter",
    address: "0x4d5e...6f7g",
    winRate: 68,
    roi: 176,
    riskLevel: "Low",
    totalTrades: 205,
    verified: true,
  },
  {
    id: "5",
    name: "BlockchainBaron",
    address: "0x5e6f...7g8h",
    winRate: 74,
    roi: 163,
    riskLevel: "Medium",
    totalTrades: 132,
    verified: false,
  },
]

export function LeaderboardTable() {
  const [sortColumn, setSortColumn] = useState<string>("roi")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const sortedTraders = [...traders].sort((a, b) => {
    const factor = sortDirection === "asc" ? 1 : -1

    switch (sortColumn) {
      case "winRate":
        return (a.winRate - b.winRate) * factor
      case "roi":
        return (a.roi - b.roi) * factor
      case "totalTrades":
        return (a.totalTrades - b.totalTrades) * factor
      default:
        return 0
    }
  })

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "High":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Trader</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("winRate")}>
                  Win Rate
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("roi")}>
                  ROI %
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("totalTrades")}>
                  Total Trades
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTraders.map((trader, index) => (
              <TableRow key={trader.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                <TableCell>
                  <Link href={`/trader/${trader.id}`} className="flex items-center gap-2 hover:underline">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <img
                        src={`/placeholder.svg?height=30&width=30&text=${trader.name.charAt(0)}`}
                        alt={trader.name}
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{trader.name}</span>
                        {trader.verified && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="ml-2 h-5 bg-blue-50 text-blue-700 border-blue-200">
                                ✓
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Verified Trader</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        {trader.address}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{trader.winRate}%</TableCell>
                <TableCell className="text-secondary font-medium">+{trader.roi}%</TableCell>
                <TableCell>{getRiskBadge(trader.riskLevel)}</TableCell>
                <TableCell>{trader.totalTrades}</TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary" size="sm" className="text-black font-medium" asChild>
                    <Link href={`/copy-trade/${trader.id}`}>
                      <CopyIcon className="mr-1 h-3 w-3" /> Copy
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  )
}

