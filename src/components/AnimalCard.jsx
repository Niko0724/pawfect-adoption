import { useNavigate } from "react-router-dom"
import { toggleFavorite } from "../utils/auth"

export default function AnimalCard({ animal, user, setUser }) {
  const navigate = useNavigate()

  const isFav = user?.favorites?.includes(animal.id)

  const handleFav = () => {
    const updated = toggleFavorite(user, animal.id)
    setUser(updated)
  }

  return (
    <div className="card">
      <img src={animal.image} />

      <div className="card-content">
        <h3>{animal.name}</h3>

        <button onClick={() => navigate(`/pet/${animal.id}`)}>
          View Profile
        </button>

        <button onClick={handleFav}>
          {isFav ? "💔 Remove Favorite" : "❤️ Favorite"}
        </button>
      </div>
    </div>
  )
}