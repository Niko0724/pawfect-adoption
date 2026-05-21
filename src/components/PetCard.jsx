import { useNavigate } from "react-router-dom"
import { toggleFavorite } from "../utils/auth"

export default function PetCard({ pet, user, setUser }) {
  const navigate = useNavigate()

  const isFav = user?.favorites?.includes(pet.id)

  const handleFav = () => {
    const updated = toggleFavorite(user, pet.id)
    setUser(updated)
  }

  return (
    <div className="pet-card">
      <div className="pet-image-container">
        <img src={pet.image} alt={pet.name} className="pet-image" />

        <button className="favorite-btn" onClick={handleFav}>
          {isFav ? "💔" : "❤️"}
        </button>
      </div>

      <div className="pet-content">
        <div className="pet-top">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed}</p>
          </div>

          <span className="pet-age">{pet.age}</span>
        </div>

        <p className="pet-species">
          {pet.species}
        </p>

        <button
          className="adopt-btn"
          onClick={() => navigate(`/pet/${pet.id}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  )
}