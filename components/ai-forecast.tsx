import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"

const forecastItems = [
  {
    time: "Next 2 hours",
    prediction: "Hydration levels expected to drop by 5%",
    risk: "medium",
    recommendation: "Send reminder notifications to 12 nurses",
  },
  {
    time: "End of shift",
    prediction: "87% of nurses will meet hydration targets",
    risk: "low",
    recommendation: "Continue current monitoring cadence",
  },
  {
    time: "Night shift",
    prediction: "Higher dehydration risk due to reduced breaks",
    risk: "high",
    recommendation: "Increase reminder frequency by 25%",
  },
]

export function AIForecast() {
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle2 className="h-4 w-4 text-accent" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getRiskBadge = (risk: string) => {
    const styles = {
      low: "bg-accent/10 text-accent dark:bg-teal-500/20 dark:text-teal-400",
      medium: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      high: "bg-destructive/10 text-destructive dark:bg-red-500/20 dark:text-red-400",
    }
    return styles[risk as keyof typeof styles] || styles.low
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              AI Hydration Forecast
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Predictive insights powered by machine learning
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {forecastItems.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-border/50 bg-secondary/30 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-card-foreground">
                  {item.time}
                </span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRiskBadge(
                  item.risk
                )}`}
              >
                {getRiskIcon(item.risk)}
                <span className="capitalize">{item.risk} risk</span>
              </div>
            </div>
            <p className="text-sm text-card-foreground">{item.prediction}</p>
            <div className="flex items-start gap-2 pt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Recommendation:</span>{" "}
                {item.recommendation}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
