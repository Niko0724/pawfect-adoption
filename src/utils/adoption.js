import { getDB, saveDB } from "./database"

export function createAdoptionRequest({ userId, petId, shelterId, message }) {
  const db = getDB()

  const request = {
    id: Date.now(),
    userId,
    petId,
    shelterId,
    message,
    status: "pending",
    createdAt: new Date().toISOString()
  }

  db.adoptions.push(request)
  saveDB(db)

  return request
}

export function updateRequestStatus(requestId, status) {
  const db = getDB()

  db.adoptions = db.adoptions.map(r =>
    r.id === requestId ? { ...r, status } : r
  )

  saveDB(db)
}

export function getAllRequests() {
  const db = getDB()
  return db.adoptions || []
}