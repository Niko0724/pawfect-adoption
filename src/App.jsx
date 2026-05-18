import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import PetProfile from "./pages/PetProfile"
import ShelterProfile from "./pages/ShelterProfile"

import { getCurrentUser } from "./utils/auth"

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  if (!user) return <Login onLogin={setUser} />

  return (
    <Routes>
      <Route path="/" element={<Home user={user} setUser={setUser} />} />
      <Route path="/pet/:id" element={<PetProfile user={user} />} />
      <Route path="/shelter/:id" element={<ShelterProfile user={user} />} />
    </Routes>
  )
}