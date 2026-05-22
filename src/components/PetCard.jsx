import { useNavigate } from "react-router-dom"
import { toggleFavorite } from "../utils/auth"

export default function PetCard({ pet, user, setUser, onAdopt }) {
  const navigate = useNavigate()

  const isFav = user?.favorites?.includes(pet.id)

  const handleFav = () => {
    const updated = toggleFavorite(user, pet.id)
    setUser(updated)
  }

  return (
    <div className="pet-card">
      <div className="pet-image-container">
        <img src={pet.image} className="pet-image" />

        <button className="favorite-btn" onClick={handleFav}>
          {isFav ? "💔" : "❤️"}
        </button>
      </div>

      <div className="pet-content">
        <h3>{pet.name}</h3>
        <p>{pet.breed}</p>
        <p>{pet.species}</p>
        {pet.tags?.length > 0 && (
          <div className="pet-tags">
            {pet.tags.map(tag => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        <button
          className="adopt-btn"
          onClick={() => onAdopt(pet)}
        >
          Adopt Me
        </button>

        <button
          className="adopt-btn"
          style={{ marginTop: 10, background: "#444" }}
          onClick={() => navigate(`/pet/${pet.id}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  )
}