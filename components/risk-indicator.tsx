import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RiskIndicatorProps {
  level: "low" | "medium" | "high"
  percentage: number
}

export function RiskIndicator({ level, percentage }: RiskIndicatorProps) {
  const levelConfig = {
    low: {
      label: "Low Risk",
      color: "bg-accent",
      textColor: "text-accent dark:text-teal-400",
      bgColor: "bg-accent/10 dark:bg-teal-500/20",
      description: "Staff hydration is within optimal range",
    },
    medium: {
      label: "Medium Risk",
      color: "bg-amber-500",
      textColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      description: "Some staff members need hydration reminders",
    },
    high: {
      label: "High Risk",
      color: "bg-destructive",
      textColor: "text-destructive dark:text-red-400",
      bgColor: "bg-destructive/10 dark:bg-red-500/20",
      description: "Immediate attention required for multiple staff",
    },
  }

  const config = levelConfig[level]

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Current Risk Level
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl",
              config.bgColor
            )}
          >
            <span className={cn("text-2xl font-bold", config.textColor)}>
              {percentage}%
            </span>
          </div>
          <div>
            <p className={cn("text-lg font-semibold", config.textColor)}>
              {config.label}
            </p>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Risk threshold</span>
            <span className="font-medium text-card-foreground">{percentage}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className={cn("h-full rounded-full transition-all", config.color)}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
