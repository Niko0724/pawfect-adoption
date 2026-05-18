import { useParams } from "react-router-dom"
import { sheltersData } from "../data/shelters"

export default function ShelterProfile() {
  const { id } = useParams()

  const shelter = sheltersData.find(s => s.id === Number(id))
  if (!shelter) return <div>Shelter not found</div>

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>{shelter.name}</h1>

        <p>{shelter.description}</p>

        <hr />

        <p><b>Email:</b> {shelter.email}</p>
        <p><b>Phone:</b> {shelter.phone}</p>
        <p><b>Address:</b> {shelter.address}</p>

        <button className="btn btn-primary">
          Contact Shelter
        </button>
      </div>
    </div>
  )
}