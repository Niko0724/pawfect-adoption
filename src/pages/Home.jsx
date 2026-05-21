import { useState } from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import FilterBar from "../components/FilterBar"
import AnimalCard from "../components/AnimalCard"
import { animalsData } from "../data/animals"
import { logoutUser } from "../utils/auth"

export default function Home({ user, setUser }) {
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

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
          <AnimalCard key={a.id} animal={a} />
        ))}
      </div>
    </>
  )
}