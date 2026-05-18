export default function Header({ user, onLogout, search, setSearch }) {
    return (
      <div className="header">
        <div className="logo">🐾 Pawfect</div>
  
        <div className="search-bar">
          <input
            placeholder="Search name, breed, species, shelter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
  
        <div className="nav-actions">
          <span style={{ marginRight: 10 }}>
            {user?.name || user?.email}
          </span>
  
          <button className="btn btn-primary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  }