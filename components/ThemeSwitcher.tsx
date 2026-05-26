'use client'

import { useEffect, useState } from 'react'
import { useTheme, Theme } from '@/components/providers/ThemeProvider'
import { cn } from '@/lib/utils'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes: { id: Theme; label: string; activeClass: string }[] = [
    {
      id: 'o3-classic',
      label: 'Classic',
      activeClass: 'bg-brand-orange text-white shadow-sm ring-1 ring-brand-orange/20',
    },
    {
      id: 'gridline-night',
      label: 'Gridline',
      activeClass: 'bg-[#38BDF8] text-[#020812] shadow-sm ring-1 ring-[#38BDF8]/20',
    },
    {
      id: 'pacific-utility',
      label: 'Pacific',
      activeClass: 'bg-[#C25E3A] text-white shadow-sm ring-1 ring-[#C25E3A]/20',
    },
  ]

  return (
    <div
      role="region"
      aria-label="Theme Switcher"
      className="fixed bottom-24 lg:bottom-6 left-6 z-50 animate-[counter-fade-in_0.3s_ease-out]"
    >
      <div className="bg-bg-white/80 border border-border backdrop-blur-md rounded-full p-1.5 shadow-floating flex items-center gap-1 select-none">
        <span className="hidden sm:inline-block text-[9px] uppercase font-bold text-text-2 tracking-widest pl-3 pr-1 select-none">
          Theme
        </span>
        <div className="flex items-center gap-1">
          {themes.map((t) => {
            const isActive = theme === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                aria-pressed={isActive}
                className={cn(
                  'text-[10px] tracking-wider uppercase font-semibold px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? t.activeClass
                    : 'text-text-2 hover:text-text-1 hover:bg-bg-cream/50',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
