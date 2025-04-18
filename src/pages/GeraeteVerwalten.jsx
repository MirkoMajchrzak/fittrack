import React, { useEffect, useState } from 'react'
import {
  loadGeraete,
  saveGeraet,
  updateGeraet,
  deleteGeraet,
} from '../utils/geraeteStorage'

function GeraeteVerwalten() {
  const [geraete, setGeraete] = useState([])
  const [neuerName, setNeuerName] = useState('')
  const [neuesBild, setNeuesBild] = useState(null)

  const [bearbeiten, setBearbeiten] = useState(null)
  const [bearbeitenName, setBearbeitenName] = useState('')
  const [bearbeitenBild, setBearbeitenBild] = useState(null)
  const [bearbeitenDateiname, setBearbeitenDateiname] = useState('')

  useEffect(() => {
    setGeraete(loadGeraete())
  }, [])

  const handleBildUpload = (e, setFn, setDateiname) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setFn(reader.result)
    reader.readAsDataURL(file)
    if (setDateiname) {
      setDateiname(file.name)
    }
  }

  const handleAdd = () => {
    if (!neuerName.trim()) return
    saveGeraet({ name: neuerName.trim(), bild: neuesBild || null })
    setGeraete(loadGeraete())
    setNeuerName('')
    setNeuesBild(null)
  }

  const handleSaveEdit = () => {
    updateGeraet(bearbeiten, {
      name: bearbeitenName.trim(),
      bild: bearbeitenBild,
    })
    setGeraete(loadGeraete())
    setBearbeiten(null)
    setBearbeitenDateiname('')
  }

  const handleDelete = (name) => {
    if (confirm(`Gerät "${name}" wirklich löschen?`)) {
      deleteGeraet(name)
      setGeraete(loadGeraete()) // <- Liste sofort aktualisieren
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">⚙️ Geräte verwalten</h2>

      {/* Neues Gerät hinzufügen */}
      <div className="border p-4 rounded mb-6 max-w-md space-y-3">
        <input
          type="text"
          placeholder="Neues Gerät z. B. Beincurl"
          value={neuerName}
          onChange={(e) => setNeuerName(e.target.value)}
          className="w-full border p-2 rounded text-black dark:text-black bg-white placeholder:text-black dark:placeholder:text-black"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleBildUpload(e, setNeuesBild)}
        />
        {neuesBild && (
          <img src={neuesBild} alt="Vorschau" className="max-w-xs rounded shadow" />
        )}
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Gerät hinzufügen
        </button>
      </div>

      {/* Geräte-Galerie */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        {geraete.map((g, i) => (
          <div
            key={i}
            className="border p-3 rounded shadow-sm space-y-2"
          >
            {bearbeiten === g.name ? (
              <>
                {/* Gerätename oben */}
                <input
                  value={bearbeitenName}
                  onChange={(e) => setBearbeitenName(e.target.value)}
                  className="w-full border p-1 rounded mb-2 text-black dark:text-black bg-white"
                  placeholder="Gerätename"
                />

                {/* 📁 Custom File Input */}
                <label className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded cursor-pointer hover:bg-blue-200">
                  📁 Bild auswählen
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleBildUpload(e, setBearbeitenBild, setBearbeitenDateiname)}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {bearbeitenDateiname || 'Keine Datei ausgewählt'}
                </p>

                {/* Vorschau */}
                {bearbeitenBild && (
                  <img
                    src={bearbeitenBild}
                    alt="Bearbeiten Vorschau"
                    className="w-full h-32 object-cover rounded mt-2"
                  />
                )}

                {/* Speichern */}
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded mt-2"
                >
                  Speichern
                </button>
              </>
            ) : (
              <>
                <div className="font-medium text-center">{g.name}</div>
                {g.bild && (
                  <img
                    src={g.bild}
                    alt={g.name}
                    className="w-full h-32 object-cover rounded shadow"
                  />
                )}
                <div className="flex justify-center gap-4 text-sm mt-2">
                  <button
                    onClick={() => {
                      setBearbeiten(g.name)
                      setBearbeitenName(g.name)
                      setBearbeitenBild(g.bild)
                      setBearbeitenDateiname('')
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(g.name)}
                    className="text-red-500 hover:underline"
                    >
                    Löschen
                   </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GeraeteVerwalten