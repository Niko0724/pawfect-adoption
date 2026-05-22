import { useState } from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import FilterBar from "../components/FilterBar"
import PetCard from "../components/PetCard"
import AdoptionModal from "../components/AdoptionModal"
import { animalsData } from "../data/animals"
import { logoutUser } from "../utils/auth"

export default function Home({ user, setUser, onOpenDrawer}) {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedPet, setSelectedPet] = useState(null)

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  const searchLower = search.toLowerCase().trim()

  const filtered = animalsData.filter(pet => {
    const matchesFilter =
      filter === "All" ||
      pet.species.toLowerCase() === filter.toLowerCase() ||
      pet.tags?.includes(filter.toLowerCase())

    const matchesSearch =
      !searchLower ||
      pet.name.toLowerCase().includes(searchLower) ||
      pet.breed.toLowerCase().includes(searchLower) ||
      pet.species.toLowerCase().includes(searchLower) ||
      pet.tags?.some(tag => tag.toLowerCase().includes(searchLower))

    return matchesFilter && matchesSearch
  })

  return (
    <>
      <Header
        user={user}
        search={search}
        setSearch={setSearch}
        onOpenDrawer={onOpenDrawer}
      />

      <Hero />

      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="grid">
        {filtered.map(pet => (
          <PetCard
            key={pet.id}
            pet={pet}
            user={user}
            setUser={setUser}
            onAdopt={setSelectedPet}
          />
        ))}
      </div>

      {selectedPet && (
        <AdoptionModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onSubmit={() => {
            alert("Application submitted!")
            setSelectedPet(null)
          }}
          setUser={setUser}
        />
      )}
    </>
  )
}