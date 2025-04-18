// import useDarkMode from '../hooks/useDarkMode'
import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  // const [darkMode, setDarkMode] = useDarkMode()

  return (
    <header className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-black dark:text-white">FitTrack</h1>
      <Link to="/">🏠 Dashboard</Link>
      {/* <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-sm bg-gray-200 dark:bg-gray-600 text-black dark:text-white px-3 py-1 rounded"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button> */}
    </header>
  )
}

export default Header