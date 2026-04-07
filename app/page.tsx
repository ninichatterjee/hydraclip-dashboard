"use client"

import { useEffect, useState, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricCard } from "@/components/metric-card"
import { HydrationChart } from "@/components/hydration-chart"
import { AIForecast } from "@/components/ai-forecast"
import { RiskIndicator } from "@/components/risk-indicator"
import { Droplet, Users, Activity, Clock } from "lucide-react"
import { fetchHydrationLogs, calculateAverageHydration, formatDataForChart } from "@/lib/hydration-data"

export default function Dashboard() {
  const [chartData, setChartData] = useState<ReturnType<typeof formatDataForChart>>([])
  const [averageHydration, setAverageHydration] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const loadData = useCallback(async () => {
    const logs = await fetchHydrationLogs()
    setAverageHydration(calculateAverageHydration(logs))
    setChartData(formatDataForChart(logs))
    setLastUpdated(
      new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    )
  }, [])

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 60 * 1000)
    return () => clearInterval(interval)
  }, [loadData])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground mt-1">
            Real-time hydration monitoring for your healthcare team
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Average Hydration"
            value={`${averageHydration}%`}
            subtitle="Across all monitored staff"
            icon={Droplet}
            trend="up"
            trendValue="3%"
            variant="default"
          />
          <MetricCard
            title="Nurses Monitored"
            value="48"
            subtitle="Currently on shift"
            icon={Users}
            variant="default"
          />
          <MetricCard
            title="Hydration Alerts"
            value="5"
            subtitle="Pending reminders"
            icon={Activity}
            trend="down"
            trendValue="2"
            variant="warning"
          />
          <MetricCard
            title="Avg. Time to Hydrate"
            value="12m"
            subtitle="Response to reminders"
            icon={Clock}
            trend="up"
            trendValue="2m"
            variant="success"
          />
        </div>

        {/* Charts and Forecast */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2">
            <HydrationChart data={chartData} />
          </div>
          <div>
            <RiskIndicator level="low" percentage={23} />
          </div>
        </div>

        {/* AI Forecast Section */}
        <div className="mb-8">
          <AIForecast />
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 pt-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>All data is anonymized and HIPAA compliant</span>
            </div>
            <div>
              <span>Last updated: {lastUpdated || "Loading..."}</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
