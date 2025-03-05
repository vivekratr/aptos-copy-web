"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

// Generate mock performance data
const generatePerformanceData = () => {
  const data = []
  let cumulativeReturn = 0

  for (let i = 0; i < 30; i++) {
    const dailyReturn = Math.random() * 3 - 0.5 // Random value between -0.5% and 2.5%
    cumulativeReturn += dailyReturn

    const date = new Date()
    date.setDate(date.getDate() - (30 - i))

    data.push({
      date: date.toISOString().split("T")[0],
      return: cumulativeReturn.toFixed(2),
    })
  }

  return data
}

export function TraderPerformanceChart() {
  const [data, setData] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setData(generatePerformanceData())
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getDate()}/${date.getMonth() + 1}`
          }}
          minTickGap={30}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[(dataMin: number) => Math.floor(dataMin - 5), (dataMax: number) => Math.ceil(dataMax + 5)]}
        />
        <Tooltip
          formatter={(value: any) => [`${value}%`, "Return"]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString()
          }}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "0.375rem",
            padding: "0.5rem",
          }}
        />
        <Line
          type="monotone"
          dataKey="return"
          stroke="#10B981"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          dot={false}
          animationDuration={1500}
          className="animate-chart-in"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

