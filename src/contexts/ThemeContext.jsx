import { createContext, useContext, useState, useEffect } from 'react'
import { THEMES, DEFAULT_THEME_ID } from '../constants/themes'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      return localStorage.getItem('stamp-calendar-theme') || DEFAULT_THEME_ID
    } catch {
      return DEFAULT_THEME_ID
    }
  })

  useEffect(() => {
    localStorage.setItem('stamp-calendar-theme', themeId)
  }, [themeId])

  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0]

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
