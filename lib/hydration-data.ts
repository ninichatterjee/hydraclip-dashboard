import { supabase } from "./supabase"

export interface HydrationLog {
  id: number
  created_at: string
  hydration_level: number
  user_id?: string
}

export async function fetchHydrationLogs() {
  const cutoff = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  
  const { data, error } = await supabase
    .from("hydration_logs")
    .select("*")
    .gte("created_at", cutoff)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching hydration logs:", error.message)
    return []
  }

  return data as HydrationLog[]
}

export function calculateAverageHydration(logs: HydrationLog[]): number {
  if (logs.length === 0) return 0
  const sum = logs.reduce((acc, log) => acc + log.hydration_level, 0)
  const average = sum / logs.length
  return Math.round(average * 100)
}

function clampPercentage(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function getForecast(data: Array<{ time: string; level: number; target: number }>) {
  if (data.length === 0) return []

  const last = data[data.length - 1]
  const prev = data.length > 1 ? data[data.length - 2].level : last.level
  const trend = last.level - prev

  return [
    { ...last, isForecast: true },
    { time: "Next 1h", level: clampPercentage(last.level + trend), target: 75, isForecast: true },
    { time: "Next 2h", level: clampPercentage(last.level + trend * 2), target: 75, isForecast: true },
    { time: "Next 3h", level: clampPercentage(last.level + trend * 3), target: 75, isForecast: true }
  ]
}

export function formatDataForChart(logs: HydrationLog[]) {
  if (logs.length === 0) {
    return []
  }
  
  const formatted = logs.map(log => ({
    time: new Date(log.created_at).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }),
    level: Math.round(log.hydration_level * 100),
    target: 75,
    isForecast: false
  }))

  const forecast = getForecast(formatted)

  return [...formatted, ...forecast].map((point) => ({
    ...point,
    actualLevel: point.isForecast ? null : point.level,
    forecastLevel: point.isForecast ? point.level : null,
  }))
}
