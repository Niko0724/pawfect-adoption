import { getDB, saveDB } from "./database"

// GET ALL PETS
export function getPets() {
  const db = getDB()
  return db.pets || []
}

// ADD PET
export function addPet(pet) {
  const db = getDB()

  const newPet = {
    id: Date.now(),
    ...pet
  }

  db.pets.push(newPet)
  saveDB(db)

  return newPet
}

// UPDATE PET
export function updatePet(id, updatedData) {
  const db = getDB()

  db.pets = db.pets.map(p =>
    p.id === id ? { ...p, ...updatedData } : p
  )

  saveDB(db)
}

// DELETE PET
export function deletePet(id) {
  const db = getDB()

  db.pets = db.pets.filter(p => p.id !== id)

  saveDB(db)
}