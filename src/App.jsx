import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

// =============================
// PAGES
// =============================

import Login from "./pages/Login"
import Home from "./pages/Home"
import PetProfile from "./pages/PetProfile"
import ShelterProfile from "./pages/ShelterProfile"

import Favorites from "./pages/Favorites"
import MyRequests from "./pages/MyRequests"
import AdminDashboard from "./pages/AdminDashboard"
import AddPet from "./pages/AddPet"

// =============================
// AUTH
// =============================

import { getCurrentUser } from "./utils/auth"

export default function App() {

  const [user, setUser] = useState(null)

  // =============================
  // LOAD CURRENT USER
  // =============================

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  // =============================
  // NOT LOGGED IN
  // =============================

  if (!user) {
    return <Login onLogin={setUser} />
  }

  // =============================
  // ROUTES
  // =============================

  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={
          <Home
            user={user}
            setUser={setUser}
          />
        }
      />

      {/* PET PROFILE */}
      <Route
        path="/pet/:id"
        element={
          <PetProfile
            user={user}
          />
        }
      />

      {/* SHELTER PROFILE */}
      <Route
        path="/shelter/:id"
        element={
          <ShelterProfile
            user={user}
            setUser={setUser}
          />
        }
      />

      {/* FAVORITES */}
      <Route
        path="/favorites"
        element={
          <Favorites
            user={user}
            setUser={setUser}
          />
        }
      />

      {/* MY REQUESTS */}
      <Route
        path="/requests"
        element={
          <MyRequests
            user={user}
          />
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          user.role === "admin"
            ? <AdminDashboard />
            : <div style={{ padding: 40 }}>
                🚫 Access Denied (Admin Only)
              </div>
        }
      />

      {/* ADD PET */}
      <Route
        path="/add-pet"
        element={
          <AddPet />
        }
      />

    </Routes>
  )
}