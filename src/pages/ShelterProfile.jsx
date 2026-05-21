import { useParams } from "react-router-dom"
import { sheltersData } from "../data/shelters"
import { animalsData } from "../data/animals"
import AnimalCard from "../components/AnimalCard"

export default function ShelterProfile({ user, setUser }) {
  const { id } = useParams()

  const shelter = sheltersData.find(s => s.id === Number(id))

  if (!shelter) return <div>Shelter not found</div>

  const shelterPets = animalsData.filter(
    pet => pet.shelterId === shelter.id
  )

  return (
    <div className="shelter-page">

      {/* HERO */}
      <div className="shelter-hero">
        <img src={shelter.image} alt={shelter.name} />

        <div>
          <h1>{shelter.name}</h1>

          <p>{shelter.description}</p>

          <div className="shelter-info">
            <p><b>Mission:</b> {shelter.mission}</p>

            <p><b>Email:</b> {shelter.email}</p>

            <p><b>Phone:</b> {shelter.phone}</p>

            <p><b>Address:</b> {shelter.address}</p>

            <p>
              <b>Facebook:</b> {shelter.socials.facebook}
            </p>

            <p>
              <b>Instagram:</b> {shelter.socials.instagram}
            </p>
          </div>
        </div>
      </div>

      {/* AVAILABLE PETS */}
      <div style={{ padding: "40px" }}>
        <h2>Available Pets 🐾</h2>

        <div className="grid">
          {shelterPets.map(pet => (
            <AnimalCard
              key={pet.id}
              animal={pet}
              user={user}
              setUser={setUser}
            />
          ))}
        </div>
      </div>
    </div>
  )
}