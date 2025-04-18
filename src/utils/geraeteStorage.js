const KEY = 'fittrack_geraete'

// Alle Geräte laden
export function loadGeraete() {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

// Neues Gerät speichern
export function saveGeraet(geraet) {
  const list = loadGeraete()
  if (!list.some((g) => g.name === geraet.name)) {
    list.push(geraet)
    localStorage.setItem(KEY, JSON.stringify(list))
  }
}

// Gerät bearbeiten (z.B. Name oder Bild)
export function updateGeraet(oldName, updated) {
  const list = loadGeraete().map((g) =>
    g.name === oldName ? { ...g, ...updated } : g
  )
  localStorage.setItem(KEY, JSON.stringify(list))
}

// ❗ Gerät korrekt löschen (vergleiche über name)
export function deleteGeraet(name) {
  const list = loadGeraete().filter((g) => g.name !== name)
  localStorage.setItem(KEY, JSON.stringify(list))
}