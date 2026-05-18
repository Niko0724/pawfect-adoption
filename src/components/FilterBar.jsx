export default function FilterBar({ filter, setFilter }) {
    const types = ["All", "Cat", "Dog", "Bird", "Rabbit"]
  
    return (
      <div className="filters">
        {types.map((t) => (
          <button
            key={t}
            className={`filter-btn ${filter === t ? "active" : ""}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
    )
  }