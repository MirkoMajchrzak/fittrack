import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-inner flex justify-around text-sm">
      <Link to="/new">➕ Einheit</Link>
      <Link to="/verlauf">📊 Verlauf</Link>
      <Link to="/devices">📸 Geräte</Link>
      <Link to="/geraete">⚙️ Verwalten</Link>
    </footer>
  )
}

export default Footer