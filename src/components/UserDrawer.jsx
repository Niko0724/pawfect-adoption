import { useNavigate } from "react-router-dom"

export default function UserDrawer({
  open,
  setOpen,
  user,
  onLogout
}) {
  const navigate = useNavigate()

  const isAdmin = user?.email?.endsWith("@admin.com")

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="drawer-backdrop"
          onClick={() => setOpen(false)}
        />
      )}

      <div className={`drawer ${open ? "open" : ""}`}>

        {/* CLOSE BUTTON (ARROW) */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            border: "none",
            background: "transparent",
            fontSize: 22,
            cursor: "pointer",
            transform: "rotate(180deg)"
          }}
        >
          ➜
        </button>

        {/* HEADER */}
        <div className="drawer-header">
          <h2>👤 {user.name}</h2>
          <p style={{ fontSize: 12, opacity: 0.7 }}>
            {user.email}
          </p>

          {/* ROLE BADGE */}
          <span
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 20,
              background: isAdmin ? "#b23a48" : "#ddd",
              color: isAdmin ? "white" : "black",
              display: "inline-block",
              marginTop: 8
            }}
          >
            {isAdmin ? "ADMIN" : "USER"}
          </span>
        </div>

        {/* NAV LINKS */}
        <div className="drawer-links">

          <button onClick={() => navigate("/favorites")}>
            ❤️ Favorites
          </button>

          <button onClick={() => navigate("/requests")}>
            🧾 My Requests
          </button>

          <button onClick={() => navigate("/")}>
            🏠 Home
          </button>

          {/* ADMIN ONLY BUTTON */}
          {isAdmin && (
            <button onClick={() => navigate("/admin")}>
              🧠 Admin Panel
            </button>
          )}

          <hr />

          <button onClick={() => navigate("/settings")}>
            ⚙ Settings
          </button>

          <button onClick={() => navigate("/help")}>
            ❓ Help
          </button>

          <hr />

          <button
            onClick={() => {
              onLogout()
              setOpen(false)
            }}
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </>
  )
}