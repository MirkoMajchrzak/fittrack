import React, { useState, useEffect } from 'react'
import { saveTrainingseintrag } from '../utils/storage'
import { loadGeraete } from '../utils/geraeteStorage'

function NewEntry() {
  const [geraet, setGeraet] = useState('')
  const [gewicht, setGewicht] = useState('')
  const [wiederholungen, setWiederholungen] = useState('')
  const [geraeteListe, setGeraeteListe] = useState([])

  useEffect(() => {
    const geraete = loadGeraete()
    setGeraeteListe(geraete)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const eintrag = {
      geraet,
      gewicht: parseFloat(gewicht),
      wiederholungen: parseInt(wiederholungen),
      datum: new Date().toISOString(),
    }

    saveTrainingseintrag(eintrag)

    setGeraet('')
    setGewicht('')
    setWiederholungen('')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">➕ Neue Trainingseinheit</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        {/* Gerät auswählen */}
        <div>
          <label className="block mb-1 font-medium">Gerät</label>
          <select
            className="w-full border border-gray-300 rounded p-2 text-black dark:text-black bg-white"
            value={geraet}
            onChange={(e) => setGeraet(e.target.value)}
            required
          >
            <option value="">Bitte wählen...</option>
            {geraeteListe.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Neue Geräte kannst du in der <a href="/geraete" className="text-blue-600 underline">Geräteverwaltung</a> hinzufügen.
          </p>
        </div>

        {/* Gewicht */}
        <div>
          <label className="block mb-1 font-medium">Gewicht (kg)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2 text-black dark:text-black bg-white"
            value={gewicht}
            onChange={(e) => setGewicht(e.target.value)}
            required
          />
        </div>

        {/* Wiederholungen */}
        <div>
          <label className="block mb-1 font-medium">Wiederholungen</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2 text-black dark:text-black bg-white"
            value={wiederholungen}
            onChange={(e) => setWiederholungen(e.target.value)}
            required
          />
        </div>

        {/* Speichern */}
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition"
        >
          💾 Speichern
        </button>
      </form>
    </div>
  )
}

export default NewEntry