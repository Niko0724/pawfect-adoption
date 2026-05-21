import { useState } from "react"
import { getDB, saveDB } from "../utils/database"

export default function AdminDashboard() {

  const db = getDB()

  const [pets, setPets] = useState(db.pets || [])
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    image: ""
  })

  // ADD PET
  const addPet = () => {
    const newPet = {
      id: Date.now(),
      ...form
    }

    db.pets.push(newPet)
    saveDB(db)

    setPets([...db.pets])
  }

  // DELETE PET
  const deletePet = (id) => {
    db.pets = db.pets.filter(p => p.id !== id)
    saveDB(db)

    setPets([...db.pets])
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>🧠 Admin Pet Management</h1>

      {/* FORM */}
      <div className="card" style={{ padding: 20 }}>
        <h3>Add Pet</h3>

        <input
          placeholder="Name"
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Species"
          onChange={e =>
            setForm({ ...form, species: e.target.value })
          }
        />

        <input
          placeholder="Breed"
          onChange={e =>
            setForm({ ...form, breed: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          onChange={e =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button onClick={addPet}>
          ➕ Add Pet
        </button>
      </div>

      {/* LIST */}
      <div className="grid" style={{ marginTop: 30 }}>
        {pets.map(pet => (
          <div key={pet.id} className="card">
            <img src={pet.image} />
            <div className="card-content">
              <h3>{pet.name}</h3>
              <p>{pet.species}</p>

              <button onClick={() => deletePet(pet.id)}>
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}