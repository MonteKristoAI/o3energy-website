'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'o3-classic' | 'gridline-night' | 'pacific-utility'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('o3-classic')

  useEffect(() => {
    // Read from localStorage on mount
    try {
      const savedTheme = localStorage.getItem('o3-theme') as Theme
      if (
        savedTheme === 'o3-classic' ||
        savedTheme === 'gridline-night' ||
        savedTheme === 'pacific-utility'
      ) {
        setThemeState(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
      } else {
        document.documentElement.setAttribute('data-theme', 'o3-classic')
      }
    } catch (e) {
      console.warn('Theme retrieval failed:', e)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    try {
      setThemeState(newTheme)
      localStorage.setItem('o3-theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    } catch (e) {
      console.warn('Theme update failed:', e)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
