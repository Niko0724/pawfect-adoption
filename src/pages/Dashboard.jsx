import { useState } from "react";
import { animalsData } from "../data/animals";
import AnimalCard from "../components/AnimalCard";
import FilterBar from "../components/FilterBar";

export default function Dashboard({ user, onLogout }) {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? animalsData
      : animalsData.filter((a) => a.type === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🐾 Pet Dashboard</h1>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filtered.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}