import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import NewEntry from "./pages/NewEntry"
import Devices from "./pages/Devices"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Verlauf from './pages/Verlauf'
import GeraeteVerwalten from './pages/GeraeteVerwalten'


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('dark') === 'true'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('dark', darkMode)
  }, [darkMode])
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white flex flex-col min-h-screen">
      <Header onToggleDark={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewEntry />} />
          <Route path="/verlauf" element={<Verlauf />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/geraete" element={<GeraeteVerwalten />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App