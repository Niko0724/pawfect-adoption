const DB_KEY = "pawfect_db"

export function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY) || "{}")
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

// init structure
export function initDB() {
  const db = getDB()

  if (!db.users) db.users = []
  if (!db.pets) db.pets = []
  if (!db.shelters) db.shelters = []
  if (!db.adoptions) db.adoptions = []

  saveDB(db)
  return db
}