import React, { useEffect, useState } from 'react'
import {
  loadTrainingseintraege,
  updateTrainingseintrag,
  deleteTrainingseintrag,
} from '../utils/storage'

function Dashboard() {
  const [eintraege, setEintraege] = useState([])
  const [bearbeiten, setBearbeiten] = useState(null)
  const [bearbeitenGeraet, setBearbeitenGeraet] = useState('')
  const [bearbeitenGewicht, setBearbeitenGewicht] = useState('')
  const [bearbeitenWiederholungen, setBearbeitenWiederholungen] = useState('')

  useEffect(() => {
    setEintraege(loadTrainingseintraege())
  }, [])

  const handleBearbeiten = (i) => {
    const eintrag = eintraege[i]
    setBearbeiten(i)
    setBearbeitenGeraet(eintrag.geraet)
    setBearbeitenGewicht(eintrag.gewicht)
    setBearbeitenWiederholungen(eintrag.wiederholungen)
  }

  const handleSave = (i) => {
    const aktualisiert = {
      ...eintraege[i],
      geraet: bearbeitenGeraet,
      gewicht: parseFloat(bearbeitenGewicht),
      wiederholungen: parseInt(bearbeitenWiederholungen),
    }

    updateTrainingseintrag(i, aktualisiert)
    setEintraege(loadTrainingseintraege())
    setBearbeiten(null)
  }

  const handleDelete = (i) => {
    if (confirm('Eintrag wirklich löschen?')) {
      deleteTrainingseintrag(i)
      setEintraege(loadTrainingseintraege())
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📋 Deine Trainingseinträge</h2>

      {eintraege.length === 0 && <p>Keine Einträge vorhanden.</p>}

      {Object.entries(
        eintraege.reduce((acc, eintrag, index) => {
          const datum = new Date(eintrag.datum).toLocaleDateString()
          if (!acc[datum]) acc[datum] = []
          acc[datum].push({ ...eintrag, index })
          return acc
        }, {})
      ).map(([datum, eintraegeAnDemTag]) => (
        <div key={datum} className="mb-6 max-w-2xl">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">📅 {datum}</h3>
          <ul className="space-y-4">
            {eintraegeAnDemTag.map(({ index, ...eintrag }) => (
              <li key={index} className="border rounded p-4 shadow">
                {bearbeiten === index ? (
                  <div className="space-y-2 mt-2">
                    <input
                      value={bearbeitenGeraet}
                      onChange={(e) => setBearbeitenGeraet(e.target.value)}
                      placeholder="Gerät"
                      className="border rounded p-2 text-black dark:text-black bg-white w-full"
                    />
                    <input
                      type="number"
                      value={bearbeitenGewicht}
                      onChange={(e) => setBearbeitenGewicht(e.target.value)}
                      placeholder="Gewicht (kg)"
                      className="border rounded p-2 text-black dark:text-black bg-white w-full"
                    />
                    <input
                      type="number"
                      value={bearbeitenWiederholungen}
                      onChange={(e) => setBearbeitenWiederholungen(e.target.value)}
                      placeholder="Wiederholungen"
                      className="border rounded p-2 text-black dark:text-black bg-white w-full"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        💾 Speichern
                      </button>
                      <button
                        onClick={() => setBearbeiten(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        ❌ Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mt-1 font-semibold">{eintrag.geraet}</p>
                    <p>🏋️ {eintrag.gewicht} kg</p>
                    <p>🔁 {eintrag.wiederholungen} Wiederholungen</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <button
                        onClick={() => handleBearbeiten(index)}
                        className="text-blue-600 hover:underline"
                      >
                        ✏️ Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:underline"
                      >
                        🗑️ Löschen
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Dashboard