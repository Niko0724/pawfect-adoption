// =============================
// PAWFECT AUTH SYSTEM (SINGLE FILE)
// =============================

const USERS_KEY = "pawfect_users"
const CURRENT_USER_KEY = "pawfect_current_user"

// =============================
// STORAGE HELPERS
// =============================

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// =============================
// REGISTER
// =============================

export function registerUser(user) {
  const users = getUsers()

  const exists = users.find(u => u.email === user.email)
  if (exists) return { error: "User already exists" }

  const newUser = {
    id: Date.now(),
    name: user.name,
    email: user.email,
    password: user.password,

    // role system (future admin/shelter support)
    role: user.role || "user", // "user" | "shelter"

    // user features
    favorites: [],
    adopted: [],       // adoption request IDs
    requests: []       // future shelter linking
  }

  users.push(newUser)
  saveUsers(users)

  return newUser
}

// =============================
// LOGIN
// =============================

export function loginUser(email, password) {
  const users = getUsers()

  const user = users.find(
    u => u.email === email && u.password === password
  )

  if (!user) return { error: "Invalid credentials" }

  // 🧠 AUTO ROLE OVERRIDE RULE
  const isAdmin = user.email.endsWith("@admin.com")

  const updatedUser = {
    ...user,
    role: isAdmin ? "admin" : "user"
  }

  localStorage.setItem("pawfect_current_user", JSON.stringify(updatedUser))

  return updatedUser
}

// =============================
// SESSION
// =============================

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY))
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// =============================
// UPDATE USER (SYNC SAFE)
// =============================

export function updateUser(updatedUser) {
  const users = getUsers()

  const updatedUsers = users.map(u =>
    u.id === updatedUser.id ? updatedUser : u
  )

  saveUsers(updatedUsers)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))

  return updatedUser
}

// =============================
// FAVORITES SYSTEM
// =============================

export function toggleFavorite(user, petId) {
  const users = getUsers()

  const updatedUsers = users.map(u => {
    if (u.id !== user.id) return u

    const favorites = u.favorites || []
    const exists = favorites.includes(petId)

    return {
      ...u,
      favorites: exists
        ? favorites.filter(id => id !== petId)
        : [...favorites, petId]
    }
  })

  saveUsers(updatedUsers)

  const updatedUser = updatedUsers.find(u => u.id === user.id)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))

  return updatedUser
}

// =============================
// ADOPTION TRACKING
// =============================

export function addUserAdoption(user, requestId) {
  const users = getUsers()

  const updatedUsers = users.map(u => {
    if (u.id !== user.id) return u

    return {
      ...u,
      adopted: [...(u.adopted || []), requestId]
    }
  })

  saveUsers(updatedUsers)

  const updatedUser = updatedUsers.find(u => u.id === user.id)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))

  return updatedUser
}