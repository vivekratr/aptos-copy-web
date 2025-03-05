"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export function LeaderboardFilters() {
  const [riskLevel, setRiskLevel] = useState<string>("all")
  const [assetType, setAssetType] = useState<string>("all")
  const [timeFrame, setTimeFrame] = useState<string>("7d")
  const [minRoi, setMinRoi] = useState<number[]>([10])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleAddFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((item) => item !== filter))
  }

  const clearFilters = () => {
    setRiskLevel("all")
    setAssetType("all")
    setTimeFrame("7d")
    setMinRoi([10])
    setSearchTerm("")
    setActiveFilters([])
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="risk-level">Risk Level</Label>
          <Select
            value={riskLevel}
            onValueChange={(value) => {
              setRiskLevel(value)
              if (value !== "all") handleAddFilter(`Risk: ${value}`)
            }}
          >
            <SelectTrigger id="risk-level">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="asset-type">Asset Type</Label>
          <Select
            value={assetType}
            onValueChange={(value) => {
              setAssetType(value)
              if (value !== "all") handleAddFilter(`Asset: ${value}`)
            }}
          >
            <SelectTrigger id="asset-type">
              <SelectValue placeholder="Select asset type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="apt">APT</SelectItem>
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="sol">SOL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time-frame">Time Frame</Label>
          <Select
            value={timeFrame}
            onValueChange={(value) => {
              setTimeFrame(value)
              handleAddFilter(`Time: ${value.toUpperCase()}`)
            }}
          >
            <SelectTrigger id="time-frame">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="min-roi">Minimum ROI %</Label>
            <span className="text-sm text-muted-foreground">{minRoi[0]}%</span>
          </div>
          <Slider
            id="min-roi"
            value={minRoi}
            onValueChange={(values) => {
              setMinRoi(values)
              handleAddFilter(`ROI: >${values[0]}%`)
            }}
            min={0}
            max={200}
            step={5}
          />
        </div>
      </div>

      <div className="flex">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by trader name or address..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={clearFilters} className="ml-2">
          Clear
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveFilter(filter)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

