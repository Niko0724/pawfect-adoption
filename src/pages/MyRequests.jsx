import { getDB } from "../utils/database"
import { animalsData } from "../data/animals"

export default function MyRequests({ user }) {

  const db = getDB()

  const requests = db.adoptions.filter(
    r => r.userId === user.id
  )

  return (
    <div style={{ padding: 40 }}>
      <h1>🧾 My Adoption Requests</h1>

      <div className="requests-list">

        {requests.map(req => {
          const pet = animalsData.find(
            p => p.id === req.petId
          )

          return (
            <div className="card" key={req.id}>
              <div className="card-content">

                <h3>{pet?.name}</h3>

                <p>
                  <b>Status:</b> {req.status}
                </p>

                <p>
                  <b>Message:</b> {req.message}
                </p>

              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}