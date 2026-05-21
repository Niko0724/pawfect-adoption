const USERS_KEY = "pawfect_users"
const CURRENT_USER_KEY = "pawfect_current_user"

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser(user) {
  const users = getUsers()

  if (users.find(u => u.email === user.email)) {
    return { error: "User already exists" }
  }

  const newUser = {
    id: Date.now(),
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role || "user",
    favorites: [],
    adopted: [],
    requests: []
  }

  users.push(newUser)
  saveUsers(users)

  return newUser
}

export function loginUser(email, password) {
  const users = getUsers()

  const user = users.find(
    u => u.email === email && u.password === password
  )

  if (!user) return { error: "Invalid credentials" }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  return user
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY))
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function updateUser(updatedUser) {
  const users = getUsers()

  const updatedUsers = users.map(u =>
    u.id === updatedUser.id ? updatedUser : u
  )

  saveUsers(updatedUsers)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))

  return updatedUser
}

export function toggleFavorite(user, petId) {
  const users = getUsers()

  const updatedUsers = users.map(u => {
    if (u.id !== user.id) return u

    const fav = u.favorites || []
    const exists = fav.includes(petId)

    return {
      ...u,
      favorites: exists
        ? fav.filter(id => id !== petId)
        : [...fav, petId]
    }
  })

  saveUsers(updatedUsers)

  const updated = updatedUsers.find(u => u.id === user.id)
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated))

  return updated
}