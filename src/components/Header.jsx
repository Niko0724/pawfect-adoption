import { useState } from "react"
import UserDrawer from "./UserDrawer"

export default function Header({
  user,
  onLogout,
  search,
  setSearch
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="header">

        <div className="logo">🐾 Pawfect</div>

        <div className="search-bar">
          <input
            placeholder="Search pets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* PROFILE BUTTON */}
        <div
          className="profile-button"
          onClick={() => setOpen(true)}
        >
          👤 {user.name}
        </div>
      </div>

      {/* SIDE DRAWER */}
      <UserDrawer
        open={open}
        setOpen={setOpen}
        user={user}
        onLogout={onLogout}
      />
    </>
  )
}