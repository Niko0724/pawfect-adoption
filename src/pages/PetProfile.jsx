import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { animalsData } from "../data/animals"
import AdoptionModal from "../components/AdoptionModal"

export default function PetProfile({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)

  const pet = animalsData.find((p) => p.id === Number(id))

  if (!pet) return <div>Pet not found</div>

  return (
    <div className="pet-profile-page">
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to All Pets
      </button>

      <div className="pet-profile-card">
        <img
          src={pet.image}
          alt={pet.name}
          className="pet-profile-image"
        />

        <div className="pet-profile-info">
          <h1>{pet.name}</h1>

          <p className="pet-location">
            {pet.location || "Unknown Location"}
          </p>

          <p className="pet-description">
            {pet.story || "Friendly and loving pet looking for a forever home."}
          </p>

          <div className="details-grid">
            <div>
              <h4>Breed</h4>
              <p>{pet.breed}</p>
            </div>

            <div>
              <h4>Age</h4>
              <p>{pet.age}</p>
            </div>

            <div>
              <h4>Species</h4>
              <p>{pet.species}</p>
            </div>

            <div>
              <h4>Color</h4>
              <p>{pet.color || "Unknown"}</p>
            </div>
          </div>

          <div className="traits-section">
            <h3>Characteristics</h3>

            <div className="tags">
              <span className="tag-pill">Friendly</span>
              <span className="tag-pill">Energetic</span>
              <span className="tag-pill">Loyal</span>
              <span className="tag-pill">Playful</span>
            </div>
          </div>

          <button
            className="adopt-main-btn"
            onClick={() => setShowModal(true)}
          >
            Adopt {pet.name}
          </button>
        </div>
      </div>

      {showModal && (
        <AdoptionModal
          pet={pet}
          onClose={() => setShowModal(false)}
          onSubmit={() => {
            alert(`Application submitted for ${pet.name}`)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}