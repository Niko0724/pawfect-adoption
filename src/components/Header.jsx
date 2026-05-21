export default function Header({
  user,
  search,
  setSearch,
  onOpenDrawer
}) {
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
        {/* SINGLE CLEAN BUTTON */}
        <button
          className="btn btn-outline"
          onClick={onOpenDrawer}
        >
          {user?.name || user?.email}
        </button>
      </div>
    </div>
  )
}