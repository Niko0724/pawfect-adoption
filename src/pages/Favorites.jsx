import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import PetCard from "../components/PetCard"
import { animalsData } from "../data/animals"

export default function Favorites({ user, setUser, onOpenDrawer }) {
  const [search, setSearch] = useState("")

  const favoritePets = animalsData.filter(pet =>
    user?.favorites?.includes(pet.id)
  )

  const searchLower = search.toLowerCase().trim()

  const filteredPets = favoritePets.filter(pet =>
    !searchLower ||
    pet.name.toLowerCase().includes(searchLower) ||
    pet.breed.toLowerCase().includes(searchLower) ||
    pet.species.toLowerCase().includes(searchLower) ||
    pet.tags?.some(tag => tag.toLowerCase().includes(searchLower))
  )

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
          <h2>❤️ My Favorites</h2>
          <p>Saved pets appear here so you can revisit them later.</p><br/>
        </div>

        <Link to="/" className="btn btn-outline">
          Browse Pets
        </Link>
      </div>

      {favoritePets.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet. Tap the heart icon on a pet card to save it.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredPets.map(pet => (
            <PetCard
              key={pet.id}
              pet={pet}
              user={user}
              setUser={setUser}
              onAdopt={() => {}}
            />
          ))}
        </div>
      )}
    </>
  )
}
