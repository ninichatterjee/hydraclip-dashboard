"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Settings, Building2, User, Moon, BellRing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SettingsPanel() {
  const { theme, setTheme } = useTheme()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-card-foreground"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your dashboard preferences
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 py-6">
          {/* Hospital Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organization
            </h4>
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Hospital Name</p>
                <p className="text-sm font-medium text-foreground">UPEI Health Center</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium text-foreground">Nursing & Patient Care</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Logged in as */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </h4>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@upei-health.ca</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Toggles */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-foreground">Preferences</h4>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="dark-mode"
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Moon className="h-4 w-4 text-muted-foreground" />
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="notifications"
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <BellRing className="h-4 w-4 text-muted-foreground" />
                Notifications
              </Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
