import { X, Info } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAdoptionRequest } from "../utils/adoption"
import { getCurrentUser, updateUser } from "../utils/auth"

export default function AdoptionModal({ pet, onClose, onSubmit, setUser }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: ""
  })

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = getCurrentUser()

    const request = createAdoptionRequest({
      userId: user.id,
      petId: pet.id,
      shelterId: pet.shelterId,
      message: form.experience
    })

    const updatedUser = {
      ...user,
      requests: [...(user.requests || []), request.id]
    }

    updateUser(updatedUser)
    if (setUser) setUser(updatedUser)
    onSubmit(request)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-bg" onClick={onClose} />

      <div className="adopt-modal">
        
        {/* LEFT SIDE - PET VISUAL */}
        <div className="adopt-left">
          <img src={pet.image} alt={pet.name} />

          <div className="pet-info">
            <h2>{pet.name}</h2>
            <p>{pet.breed} • {pet.species}</p>
            <span className="tag">{pet.age}</span>
          </div>

          <div className="adopt-actions">
            <button onClick={() => navigate(`/pet/${pet.id}`)}>
              <Info size={16} />
              View Details
            </button>

            <button onClick={onClose} className="close-btn">
              <X size={16} />
              Close
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="adopt-right">
          <h3>Adoption Application</h3>
          <p className="subtitle">
            Help {pet.name} find a loving home 🐾
          </p>

          <form onSubmit={handleSubmit}>

            <div className="grid-2">
              <input name="name" placeholder="Full Name" onChange={handleChange} required />
              <input name="phone" placeholder="Phone" onChange={handleChange} required />
            </div>

            <input name="email" placeholder="Email Address" onChange={handleChange} required />
            <input name="address" placeholder="Complete Address" onChange={handleChange} required />

            <textarea
              name="experience"
              placeholder="Do you have experience with pets? Tell us more..."
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}