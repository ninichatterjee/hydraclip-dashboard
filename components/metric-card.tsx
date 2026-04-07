import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  variant?: "default" | "success" | "warning" | "danger"
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
}: MetricCardProps) {
  const variantStyles = {
    default: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
    success: "bg-accent/10 text-accent dark:bg-accent/25 dark:text-accent",
    warning: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    danger: "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
  }

  const trendStyles = {
    up: "text-accent",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  }

  return (
    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-semibold tracking-tight text-card-foreground">
                {value}
              </p>
              {trendValue && trend && (
                <span className={cn("text-sm font-medium", trendStyles[trend])}>
                  {trend === "up" ? "+" : trend === "down" ? "-" : ""}
                  {trendValue}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              variantStyles[variant]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
