import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

function TrainingChart({ eintraege, geraet }) {
  // Filter nach gewähltem Gerät
  const daten = eintraege
    .filter((e) => e.geraet === geraet)
    .sort((a, b) => new Date(a.datum) - new Date(b.datum))
    .map((e) => ({
      datum: new Date(e.datum).toLocaleDateString(),
      gewicht: e.gewicht,
    }))

  if (daten.length === 0) return <p>Keine Daten für {geraet} vorhanden.</p>

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-2">📈 Verlauf: {geraet}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={daten}>
          <XAxis dataKey="datum" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="gewicht" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TrainingChart