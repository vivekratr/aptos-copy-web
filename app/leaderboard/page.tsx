import { LeaderboardFilters } from "@/components/leaderboard/leaderboard-filters"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LeaderboardPage() {
  return (
    <div className="container px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Trader Leaderboard</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
        Discover the top-performing traders on our platform. Filter by risk level, asset type, and time frame to find
        the perfect match for your trading style.
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Find Your Perfect Trader</CardTitle>
            <CardDescription>Use the filters below to narrow down your search</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardFilters />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Traders</CardTitle>
            <CardDescription>Ranked by performance over the selected time period</CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

