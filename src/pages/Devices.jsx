import React, { useEffect, useState } from 'react'
import { loadGeraete } from '../utils/geraeteStorage'

function Devices() {
  const [geraete, setGeraete] = useState([])
  const [zoomBild, setZoomBild] = useState(null)

  useEffect(() => {
    setGeraete(loadGeraete())
  }, [])

  const bilderMitFoto = geraete.filter((g) => g.bild)

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📸 Gerätebilder</h2>

      {bilderMitFoto.length === 0 && <p>Keine Geräte mit Bild vorhanden.</p>}

      <div className="grid grid-cols-2 gap-4">
        {bilderMitFoto.map((g, i) => (
          <div
            key={i}
            className="relative cursor-pointer group"
            onClick={() => setZoomBild(g.bild)}
          >
            {/* Titel oben */}
            <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded-t">
              {g.name}
            </div>

            <img
              src={g.bild}
              alt={g.name}
              className="w-full h-48 object-cover rounded shadow group-hover:opacity-80"
            />
          </div>
        ))}
      </div>

      {/* Modal (Zoom) */}
      {zoomBild && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setZoomBild(null)}
        >
          <img
            src={zoomBild}
            alt="Zoom"
            className="max-w-full max-h-full rounded shadow-lg border-4 border-white"
          />
        </div>
      )}
    </div>
  )
}

export default Devices