"use client"

import { useState } from "react"
import { Bell, AlertTriangle, TrendingUp, TrendingDown, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const notifications = [
  {
    id: 1,
    icon: AlertTriangle,
    iconColor: "text-red-500",
    message: "Nurse hydration dropped below 60%",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: Brain,
    iconColor: "text-purple-500",
    message: "AI Forecast: Hydration expected to drop by 5% in 2 hours",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 3,
    icon: TrendingDown,
    iconColor: "text-amber-500",
    message: "12 nurses need hydration reminders",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 4,
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    message: "Hydration levels improving across shift",
    time: "32 min ago",
    unread: false,
  },
  {
    id: 5,
    icon: AlertTriangle,
    iconColor: "text-red-500",
    message: "Critical: 3 staff members severely dehydrated",
    time: "1 hr ago",
    unread: false,
  },
]

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [readIds, setReadIds] = useState<number[]>([])

  const unreadCount = notifications.filter(
    (n) => n.unread && !readIds.includes(n.id)
  ).length

  function handleOpen(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      setReadIds(notifications.map((n) => n.id))
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-card-foreground"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b border-border px-4 py-3">
          <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread alerts` : "All caught up"}
          </p>
        </div>
        <div className="max-h-[320px] overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon
            const isUnread = notification.unread && !readIds.includes(notification.id)
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 transition-colors ${
                  isUnread ? "bg-primary/5" : ""
                }`}
              >
                <div className={`mt-0.5 ${notification.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                {isUnread && (
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
