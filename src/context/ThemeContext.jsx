import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'cxc-theme'

const THEME_COLORS = {
  default: '#0B2AAA',
  aurora:  '#160a35',
  arctic:  '#F4F7FF',
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(THEME_KEY) || 'default'
  )

  useEffect(() => {
    // Apply to <html data-theme="…">
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'default' ? '' : theme
    )
    // Update meta theme-color
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = THEME_COLORS[theme] ?? '#0B2AAA'
  }, [theme])

  const setTheme = useCallback((t) => {
    setThemeState(t)
    localStorage.setItem(THEME_KEY, t)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}
