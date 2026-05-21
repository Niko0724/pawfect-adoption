import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { animalsData } from "../data/animals"
import { sheltersData } from "../data/shelters"
import { createAdoptionRequest } from "../utils/adoption"

export default function PetProfile({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const pet = animalsData.find(p => p.id === Number(id))
  if (!pet) return <div>Pet not found</div>

  const shelter = sheltersData.find(s => s.id === pet.shelterId)

  const handleAdopt = () => {
    if (!message) return alert("Please write a short message")

    createAdoptionRequest({
      userId: user.id,
      petId: pet.id,
      shelterId: shelter.id,
      message
    })

    alert("Adoption request sent successfully 🐾")

    navigate(`/shelter/${shelter.id}`)
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={pet.image} alt={pet.name} />

        <div>
          <h1>{pet.name}</h1>

          <p><b>Breed:</b> {pet.breed}</p>
          <p><b>Species:</b> {pet.species}</p>
          <p><b>Age:</b> {pet.age}</p>

          <hr />

          <p><b>Story:</b> {pet.story}</p>
          <p><b>Injuries:</b> {pet.injuries}</p>

          {/* 🧾 NEW: Adoption Message */}
          <div style={{ marginTop: 20 }}>
            <h3>Why do you want to adopt?</h3>

            <textarea
              placeholder="Write your message to the shelter..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                height: 100,
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd"
              }}
            />
          </div>

          {/* 🧠 Adopt Button */}
          <button
            className="btn btn-primary"
            onClick={handleAdopt}
            style={{ marginTop: 15 }}
          >
            Send Adoption Request 🧾
          </button>

          {/* 🏠 Secondary action */}
          <button
            onClick={() => navigate(`/shelter/${shelter.id}`)}
            style={{ marginTop: 10 }}
            className="btn btn-outline"
          >
            View Shelter Info
          </button>
        </div>
      </div>
    </div>
  )
}