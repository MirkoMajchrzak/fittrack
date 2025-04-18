import React, { useEffect, useState } from 'react'
import { loadTrainingseintraege } from '../utils/storage'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function Verlauf() {
  const [eintraege, setEintraege] = useState([])
  const [geraete, setGeraete] = useState([])
  const [auswahl, setAuswahl] = useState('')
  const [daten, setDaten] = useState([])

  useEffect(() => {
    const eintraege = loadTrainingseintraege()
    setEintraege(eintraege)

    const uniqueGeraete = [...new Set(eintraege.map((e) => e.geraet))]
    setGeraete(uniqueGeraete)
  }, [])

  useEffect(() => {
    if (!auswahl) {
      setDaten([])
      return
    }

    const gefiltert = eintraege
      .filter((e) => e.geraet === auswahl)
      .map((e) => ({
        datum: new Date(e.datum).toLocaleDateString(),
        gewicht: e.gewicht,
        wiederholungen: e.wiederholungen,
      }))
    setDaten(gefiltert)
  }, [auswahl, eintraege])

  // 🌓 Theme-Abfrage
  const isDark = document.documentElement.classList.contains('dark')
  const axisColor = isDark ? '#ffffff' : '#000000'
  const tooltipTextColor = isDark ? '#ffffff' : '#000000'
  const tooltipBg = isDark ? '#1f2937' : '#ffffff'

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📈 Trainingsverlauf</h2>

      <div className="mb-6 max-w-md">
        <label className="block mb-1 font-medium">Gerät auswählen</label>
        <select
          value={auswahl}
          onChange={(e) => setAuswahl(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 text-black dark:text-black bg-white"
        >
          <option value="">Bitte wählen...</option>
          {geraete.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {daten.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={daten}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datum" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: '#ccc',
              }}
              labelStyle={{ color: tooltipTextColor }}
              itemStyle={{ color: tooltipTextColor }}
            />
            <Line
              type="monotone"
              dataKey="gewicht"
              stroke="#10b981"
              name="Gewicht (kg)"
            />
            <Line
              type="monotone"
              dataKey="wiederholungen"
              stroke="#3b82f6"
              name="Wiederholungen"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : auswahl ? (
        <p>Keine Daten für dieses Gerät.</p>
      ) : (
        <p>Bitte Gerät auswählen, um den Verlauf zu sehen.</p>
      )}
    </div>
  )
}

export default Verlauf