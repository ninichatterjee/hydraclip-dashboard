"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts"

interface HydrationChartProps {
  data: Array<{
    time: string
    level: number
    target: number
    isForecast?: boolean
    actualLevel?: number | null
    forecastLevel?: number | null
  }>
}

export function HydrationChart({ data }: HydrationChartProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Hydration Trends
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Average hydration levels throughout the day
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Target</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Forecast</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.15 240)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="oklch(0.55 0.15 240)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                dy={10}
                interval="preserveStartEnd"
                minTickGap={60}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  color: "var(--color-foreground)",
                }}
                labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#eab308"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="actualLevel"
                stroke="oklch(0.55 0.15 240)"
                strokeWidth={3}
                fill="url(#colorLevel)"
                dot={{ fill: "oklch(0.55 0.15 240)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "oklch(0.55 0.15 240)" }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="forecastLevel"
                stroke="#10b981"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#10b981" }}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
