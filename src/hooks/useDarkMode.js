import { useEffect, useState } from 'react'

export default function useDarkMode() {
  // Lade initialen Zustand aus localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    const root = window.document.documentElement

    // 🧠 Nur Klasse setzen, wenn sie sich ändern muss
    const hasDarkClass = root.classList.contains('dark')
    if (darkMode && !hasDarkClass) {
      root.classList.add('dark')
    } else if (!darkMode && hasDarkClass) {
      root.classList.remove('dark')
    }

    // Speichern
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return [darkMode, setDarkMode]
}