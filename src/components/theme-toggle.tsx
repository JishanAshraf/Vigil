
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      onClick={toggleTheme}
      className={cn(
        'glossy-button relative h-10 w-10 rounded-lg bg-transparent text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0'
      )}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] opacity-100 transition-opacity dark:opacity-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] opacity-0 transition-opacity dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
