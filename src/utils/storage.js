const KEY = 'fittrack_trainingsdaten'

export function saveTrainingseintrag(eintrag) {
  const daten = loadTrainingseintraege()
  daten.push(eintrag)
  localStorage.setItem(KEY, JSON.stringify(daten))
}

export function loadTrainingseintraege() {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

export function deleteTrainingseintrag(index) {
    const daten = loadTrainingseintraege()
    daten.splice(index, 1) // entferne 1 Element an Position index
    localStorage.setItem(KEY, JSON.stringify(daten))
  }
  
  export function updateTrainingseintrag(index, updatedEntry) {
    const daten = loadTrainingseintraege()
    daten[index] = updatedEntry
    localStorage.setItem(KEY, JSON.stringify(daten))
  }