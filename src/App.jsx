import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import PetProfile from "./pages/PetProfile"
import ShelterProfile from "./pages/ShelterProfile"
import ScrollToTopButton from "./components/ScrollToTopButton"
import UserDrawer from "./components/UserDrawer"
import Settings from "./pages/Settings"

import { getCurrentUser, logoutUser } from "./utils/auth"

export default function App() {
  const [user, setUser] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("pawfect_theme") === "dark"
  )

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
      localStorage.setItem("pawfect_theme", "dark")
    } else {
      document.body.classList.remove("dark")
      localStorage.setItem("pawfect_theme", "light")
    }
  }, [darkMode])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  if (!user) return <Login onLogin={setUser} />

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              setUser={setUser}
              onOpenDrawer={() => setDrawerOpen(true)}
            />
          }
        />

        <Route path="/pet/:id" element={<PetProfile user={user} />} />
        <Route path="/shelter/:id" element={<ShelterProfile user={user} />} />
        
        <Route
          path="/settings"
          element={
            <Settings
              user={user}
              setUser={setUser}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
      </Routes>

      {/* GLOBAL UI */}
      <ScrollToTopButton />

      <UserDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        user={user}
        onLogout={handleLogout}
      />
    </>
  )
}