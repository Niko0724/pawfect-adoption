import { useNavigate } from "react-router-dom"

export default function UserDrawer({
  open,
  setOpen,
  user,
  onLogout
}) {
  const navigate = useNavigate()

  if (!user) return null

  const isAdmin = user.role === "admin" || user.email?.endsWith("@admin.com")

  const closeDrawer = () => setOpen(false)

  const goTo = (path) => {
    navigate(path)
    closeDrawer()
  }

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="drawer-backdrop"
          onClick={closeDrawer}
        />
      )}

      {/* DRAWER */}
      <div className={`drawer ${open ? "open" : ""}`}>

        {/* CLOSE BUTTON */}
        <button
          onClick={closeDrawer}
          className="drawer-close-btn"
          aria-label="Close drawer"
        >
          ➜
        </button>

        {/* HEADER */}
        <div className="drawer-header">
          <h2>👤 {user.name || "User"}</h2>

          <p className="drawer-email">
            {user.email}
          </p>

          <span
            className={`drawer-badge ${isAdmin ? "admin" : "user"}`}
          >
            {isAdmin ? "ADMIN" : "USER"}
          </span>
        </div>

        {/* LINKS */}
        <div className="drawer-links">

          <button onClick={() => goTo("/favorites")}>
            ❤️ Favorites
          </button>

          <button onClick={() => goTo("/requests")}>
            🧾 My Requests
          </button>

          <button onClick={() => goTo("/")}>
            🏠 Home
          </button>

          {isAdmin && (
            <button onClick={() => goTo("/admin")}>
              🧠 Admin Panel
            </button>
          )}

          <hr />

          <button onClick={() => goTo("/settings")}>
            ⚙ Settings
          </button>

          <button onClick={() => goTo("/help")}>
            ❓ Help
          </button>

          <hr />

          <button
            className="logout-btn"
            onClick={() => {
              onLogout()
              closeDrawer()
            }}
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </>
  )
}