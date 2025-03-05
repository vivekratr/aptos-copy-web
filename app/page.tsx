import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/home/feature-card"
import { StatCard } from "@/components/home/stat-card"
import { ArrowRight, AreaChart, Coins, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero section */}
      <section className="hero-gradient text-white py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">AI-Powered Copy Trading on Aptos</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-gray-200">
              Start copying pro traders with just 1 click. Let AI find the best performers for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-black font-semibold px-8 py-6 text-lg"
              >
                Connect Wallet
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Link href="/leaderboard" className="flex items-center">
                  Explore Traders <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="AI Trader Ranking"
              description="Our AI analyzes thousands of traders to find the most profitable ones for you to copy."
              icon={<AreaChart className="h-10 w-10 text-secondary" />}
            />
            <FeatureCard
              title="Auto Trade Execution"
              description="Set it and forget it. Our platform executes trades automatically based on your selected trader."
              icon={<Coins className="h-10 w-10 text-secondary" />}
            />
            <FeatureCard
              title="Real-Time Performance"
              description="Monitor your profits and performance in real-time with detailed analytics."
              icon={<Shield className="h-10 w-10 text-secondary" />}
            />
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Live Platform Stats</h2>
          <div className="stats-grid">
            <StatCard title="Total Users" value="14,587" trend="+12%" />
            <StatCard title="Total Trades" value="152,947" trend="+8%" />
            <StatCard title="Best Trader ROI" value="247%" trend="+5%" />
            <StatCard title="Trading Volume" value="$24.5M" trend="+15%" />
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-primary text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Copying Pro Traders?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Join thousands of traders who are already leveraging AI to boost their trading performance.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-black font-semibold px-8 py-6 text-lg">
            Start Copy Trading Now
          </Button>
        </div>
      </section>
    </div>
  )
}

