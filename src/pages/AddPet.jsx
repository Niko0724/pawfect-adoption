import { useState } from "react"
import { animalsData } from "../data/animals"

export default function AddPet() {

  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    story: "",
    injuries: "",
    image: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPet = {
      id: Date.now(),
      ...form,
      shelterId: 1,
      tags: [form.species.toLowerCase()]
    }

    animalsData.push(newPet)

    alert("Pet added successfully 🐾")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🐾 Add Pet</h1>

      <form
        onSubmit={handleSubmit}
        className="card"
        style={{
          maxWidth: 500,
          padding: 20
        }}
      >

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          placeholder="Species"
          onChange={(e) =>
            setForm({
              ...form,
              species: e.target.value
            })
          }
        />

        <input
          placeholder="Breed"
          onChange={(e) =>
            setForm({
              ...form,
              breed: e.target.value
            })
          }
        />

        <input
          placeholder="Age"
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value
            })
          }
        />

        <textarea
          placeholder="Story"
          onChange={(e) =>
            setForm({
              ...form,
              story: e.target.value
            })
          }
        />

        <input
          placeholder="Image URL"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value
            })
          }
        />

        <button type="submit">
          Add Pet
        </button>

      </form>
    </div>
  )
}