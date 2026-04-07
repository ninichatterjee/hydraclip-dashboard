"use client"

import { Droplets } from "lucide-react"
import { NotificationBell } from "@/components/notification-bell"
import { SettingsPanel } from "@/components/settings-panel"

export function DashboardHeader() {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-card-foreground tracking-tight">
                HydraClip
              </h1>
              <p className="text-xs text-muted-foreground">
                Nurse Hydration Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 dark:bg-secondary text-sm">
              <div className="h-2 w-2 rounded-full bg-accent dark:bg-teal-400 animate-pulse" />
              <span className="text-muted-foreground dark:text-secondary-foreground">Live monitoring</span>
            </div>
            <NotificationBell />
            <SettingsPanel />
          </div>
        </div>
      </div>
    </header>
  )
}
