import { useState } from "react"
import { getAllRequests, updateRequestStatus } from "../utils/adoption"

export default function AdminDashboard() {
  const [requests, setRequests] = useState(getAllRequests())

  const update = (id, status) => {
    updateRequestStatus(id, status)
    setRequests(getAllRequests())
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      {requests.map(r => (
        <div key={r.id} className="card">
          <div className="card-content">
            <p>Pet ID: {r.petId}</p>
            <p>Status: {r.status}</p>

            <button onClick={() => update(r.id, "approved")}>
              Approve
            </button>

            <button onClick={() => update(r.id, "rejected")}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}