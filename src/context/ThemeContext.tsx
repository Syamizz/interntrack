import { useState, type ReactNode } from 'react'
import { ThemeContext } from './theme-context'

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode((previous) => !previous)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}