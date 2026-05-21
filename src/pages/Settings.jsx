import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { getUsers, saveUsers, updateUser } from "../utils/auth"

export default function Settings({ user, setUser, darkMode, setDarkMode }) {

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handlePasswordChange = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const users = getUsers()

    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, password: newPassword }
      }
      return u
    })

    saveUsers(updatedUsers)

    const updatedUser = { ...user, password: newPassword }
    updateUser(updatedUser)
    setUser(updatedUser)

    alert("Password updated successfully")
    setNewPassword("")
    setConfirmPassword("")
  }
  
  const navigate = useNavigate()

  return (
    <div style={{ padding: 40 }}>
    <div style={{ marginBottom: 20 }}>
        <button
            className="back-btn"
            onClick={() => navigate(-1)}
        >
            ← Back
        </button>
    </div>

      <h1>Settings ⚙</h1>

      {/* DARK MODE */}
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-content">
          <h3>Appearance</h3>

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>
        </div>
      </div>

      {/* PASSWORD CHANGE */}
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-content">
          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={handlePasswordChange}
            style={{ marginTop: 10 }}
          >
            Update Password
          </button>
        </div>
      </div>

    </div>
  )
}