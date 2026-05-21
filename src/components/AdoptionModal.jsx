import { X, Info } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdoptionModal({ pet, onClose, onSubmit }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-bg" onClick={onClose}></div>

      <div className="modal">
        <div className="modal-header">
          <button onClick={() => navigate(`/pet/${pet.id}`)}>
            <Info size={18} />
          </button>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">
          <h2>Adopt {pet.name}</h2>

          <p>
            {pet.breed} • {pet.age}
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />

            <textarea
              name="experience"
              placeholder="Pet care experience..."
              onChange={handleChange}
              required
            />

            <div className="modal-actions">
              <button type="button" onClick={onClose}>
                Cancel
              </button>

              <button type="submit">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}