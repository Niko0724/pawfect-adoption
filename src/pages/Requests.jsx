import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { animalsData } from "../data/animals"
import { sheltersData } from "../data/shelters"
import { getAllRequests } from "../utils/adoption"

export default function Requests({ user, setUser, onOpenDrawer }) {
  const [search, setSearch] = useState("")
  const requests = getAllRequests().filter(
    request => request.userId === user?.id
  )

  const enrichedRequests = requests.map(request => {
    return {
      request,
      pet: animalsData.find(p => p.id === request.petId),
      shelter: sheltersData.find(s => s.id === request.shelterId)
    }
  })

  const filteredRequests = enrichedRequests.filter(item => {
    if (!search.trim()) return true

    const needle = search.toLowerCase()
    return [
      item.pet?.name,
      item.pet?.breed,
      item.pet?.species,
      item.shelter?.name,
      item.request.status
    ]
      .filter(Boolean)
      .some(value => value.toLowerCase().includes(needle))
  })

  return (
    <>
      <Header
        user={user}
        search={search}
        setSearch={setSearch}
        onOpenDrawer={onOpenDrawer}
      />

      <div className="page-header">
        <div>
          <h2>🧾 My Adoption Requests</h2>
          <p>Track every pet adoption request you have submitted.</p>
        </div>

        <Link to="/" className="btn btn-outline">
          Browse More Pets
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          <p>You have not submitted any adoption requests yet.</p>
          <Link to="/" className="btn btn-primary">
            Start Your First Request
          </Link>
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map(request => {
            const pet = animalsData.find(p => p.id === request.petId)
            const shelter = sheltersData.find(s => s.id === request.shelterId)
            return (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div>
                    <h3>{pet?.name ?? "Unknown Pet"}</h3>
                    <p>{pet?.breed ?? "Unknown breed"} • {pet?.species ?? "Unknown"}</p>
                  </div>
                  <span className={`tag ${request.status}`}>{request.status}</span>
                </div>

                <p className="request-note">"{request.message || "No message provided."}"</p>

                <div className="request-meta">
                  <div>
                    <strong>Shelter</strong>
                    <p>{shelter?.name ?? "Unknown Shelter"}</p>
                  </div>
                  <div>
                    <strong>Submitted</strong>
                    <p>{new Date(request.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="request-actions">
                  <Link to={`/pet/${pet?.id ?? 0}`} className="btn btn-outline">
                    View Pet
                  </Link>
                  {shelter && (
                    <Link to={`/shelter/${shelter.id}`} className="btn btn-primary">
                      View Shelter
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
