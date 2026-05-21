const DB_KEY = "pawfect_db"

export function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY) || "null")
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

export function initDB() {
  let db = getDB()

  if (!db) {
    db = {
      users: [],
      pets: [],
      shelters: [],
      adoptions: []
    }
  }

  saveDB(db)
  return db
}