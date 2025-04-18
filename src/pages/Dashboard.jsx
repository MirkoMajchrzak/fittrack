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
  const [geöffnetesDatum, setGeöffnetesDatum] = useState(null)

  useEffect(() => {
    setEintraege(loadTrainingseintraege())
  }, [])

  const handleBearbeiten = (index) => {
    const e = eintraege[index]
    setBearbeiten(index)
    setBearbeitenGeraet(e.geraet)
    setBearbeitenGewicht(e.gewicht)
    setBearbeitenWiederholungen(e.wiederholungen)
  }

  const handleSave = (index) => {
    const aktualisiert = {
      ...eintraege[index],
      geraet: bearbeitenGeraet,
      gewicht: parseFloat(bearbeitenGewicht),
      wiederholungen: parseInt(bearbeitenWiederholungen),
    }
    updateTrainingseintrag(index, aktualisiert)
    setEintraege(loadTrainingseintraege())
    setBearbeiten(null)
  }

  const handleDelete = (index) => {
    if (confirm('Eintrag wirklich löschen?')) {
      deleteTrainingseintrag(index)
      setEintraege(loadTrainingseintraege())
    }
  }

  // Gruppieren nach Datum
  const gruppiert = eintraege.reduce((acc, eintrag, index) => {
    const datum = new Date(eintrag.datum).toLocaleDateString('de-DE')
    if (!acc[datum]) acc[datum] = []
    acc[datum].push({ ...eintrag, index })
    return acc
  }, {})

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📋 Deine Trainingseinträge</h2>

      {Object.keys(gruppiert).length === 0 && <p>Keine Einträge vorhanden.</p>}

      {Object.entries(gruppiert).map(([datum, eintraegeAnTag]) => (
        <div key={datum} className="mb-4 max-w-2xl border rounded shadow">
          <button
            className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white font-semibold"
            onClick={() =>
              setGeöffnetesDatum(geöffnetesDatum === datum ? null : datum)
            }
          >
            📅 {datum}
          </button>

          {geöffnetesDatum === datum && (
            <ul className="p-4 space-y-4">
              {eintraegeAnTag.map((eintrag) => (
                <li key={eintrag.index} className="border rounded p-4 shadow-sm bg-white dark:bg-gray-800">
                  {bearbeiten === eintrag.index ? (
                    <div className="space-y-2">
                      <input
                        value={bearbeitenGeraet}
                        onChange={(e) => setBearbeitenGeraet(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black dark:text-black"
                        placeholder="Gerät"
                      />
                      <input
                        type="number"
                        value={bearbeitenGewicht}
                        onChange={(e) => setBearbeitenGewicht(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black dark:text-black"
                        placeholder="Gewicht (kg)"
                      />
                      <input
                        type="number"
                        value={bearbeitenWiederholungen}
                        onChange={(e) => setBearbeitenWiederholungen(e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black dark:text-black"
                        placeholder="Wiederholungen"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSave(eintrag.index)}
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
                      <p className="font-semibold">{eintrag.geraet}</p>
                      <p>🏋️ {eintrag.gewicht} kg</p>
                      <p>🔁 {eintrag.wiederholungen} Wiederholungen</p>

                      <div className="flex gap-4 mt-2 text-sm">
                        <button
                          onClick={() => handleBearbeiten(eintrag.index)}
                          className="text-blue-600 hover:underline"
                        >
                          ✏️ Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDelete(eintrag.index)}
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
          )}
        </div>
      ))}
    </div>
  )
}

export default Dashboard