import { useParams, useNavigate } from "react-router-dom"
import { sheltersData } from "../data/shelters"

export default function ShelterProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const shelter = sheltersData.find(s => s.id === Number(id))
  if (!shelter) return <div>Shelter not found</div>

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to shelters
      </button>
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <span className="profile-badge">Shelter</span>
            <h1>{shelter.name}</h1>
            <p className="profile-subtitle">{shelter.description}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => window.location.assign(`mailto:${shelter.email}`)}
          >
            Contact Shelter
          </button>
        </div>

        <div className="profile-columns">
          <div className="profile-details">
            <div className="detail-row">
              <span>Email</span>
              <strong>{shelter.email}</strong>
            </div>
            <div className="detail-row">
              <span>Phone</span>
              <strong>{shelter.phone}</strong>
            </div>
            <div className="detail-row">
              <span>Location</span>
              <strong>{shelter.address}</strong>
            </div>
          </div>

          <div className="profile-summary-card">
            <h3>Why adopt from here?</h3>
            <ul>
              <li>Responsible rescue and adoption support.</li>
              <li>Personalized care for every animal.</li>
              <li>Fast follow-up and friendly staff.</li>
            </ul>
            <p>
              Send a message to ask about pets, donations, volunteer roles, or
              shelter visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}