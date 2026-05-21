import { useState } from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import FilterBar from "../components/FilterBar"
import PetCard from "../components/PetCard"
import AdoptionModal from "../components/AdoptionModal"
import { animalsData } from "../data/animals"
import { logoutUser } from "../utils/auth"

export default function Home({ user, setUser }) {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedPet, setSelectedPet] = useState(null)

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  const filtered = animalsData.filter((a) => {
    const matchesFilter =
      filter === "All" ||
      a.species === filter ||
      a.tags.includes(filter.toLowerCase())

    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.species.toLowerCase().includes(search.toLowerCase()) ||
      a.breed.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <>
      <Header
        user={user}
        onLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />

      <Hero />

      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="grid">
        {filtered.map((a) => (
          <PetCard
            key={a.id}
            pet={a}
            user={user}
            setUser={setUser}
            onAdopt={setSelectedPet}
          />
        ))}
      </div>

      {selectedPet && (
        <AdoptionModal
          pet={selectedPet}
          user={user}
          onClose={() => setSelectedPet(null)}
        />
      )}
    </>
  )
}