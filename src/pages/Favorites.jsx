import { animalsData } from "../data/animals"
import AnimalCard from "../components/AnimalCard"

export default function Favorites({ user, setUser }) {

  const favorites = animalsData.filter(pet =>
    user.favorites?.includes(pet.id)
  )

  return (
    <div style={{ padding: 40 }}>
      <h1>❤️ Favorite Pets</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid">
          {favorites.map(pet => (
            <AnimalCard
              key={pet.id}
              animal={pet}
              user={user}
              setUser={setUser}
            />
          ))}
        </div>
      )}
    </div>
  )
}