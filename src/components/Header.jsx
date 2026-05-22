import { useEffect, useMemo, useRef, useState } from "react"
import { animalsData } from "../data/animals"

export default function Header({
  user,
  search,
  setSearch,
  onOpenDrawer
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [inputValue, setInputValue] = useState(search || "")
  const lastScrollY = useRef(0)
  const shouldStayVisible = useRef(false)

  useEffect(() => {
    setInputValue(search || "")
  }, [search])

  const tagSuggestions = useMemo(() => {
    return Array.from(
      new Set(animalsData.flatMap(pet => pet.tags || []))
    ).sort()
  }, [])

  const filteredSuggestions = inputValue
    ? tagSuggestions.filter(tag =>
        tag.toLowerCase().includes(inputValue.toLowerCase())
      )
    : []

  const commitSearch = (value) => {
    setSearch(value)
    setShowSuggestions(false)
  }

  const handleSelectSuggestion = (tag) => {
    setInputValue(tag)
    commitSearch(tag)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 60) {
        setShowHeader(true)
        shouldStayVisible.current = false
      } else if (currentY > lastScrollY.current) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      lastScrollY.current = currentY
    }

    const handleMouseMove = (event) => {
      if (event.clientY < 70) {
        setShowHeader(true)
        shouldStayVisible.current = true
      } else if (window.scrollY > 60 && !shouldStayVisible.current) {
        setShowHeader(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className={`header ${showHeader ? "" : "hidden"}`}>
      <div className="logo">🐾 Pawfect</div>

      <div className="search-bar">
        <div className="search-wrapper">
          <input
            placeholder="Search name, breed, species, tags..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                commitSearch(inputValue)
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="search-suggestions">
              {filteredSuggestions.map(tag => (
                <li
                  key={tag}
                  onMouseDown={() => handleSelectSuggestion(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="nav-actions">
        {/* SINGLE CLEAN BUTTON */}
        <button
          className="btn btn-outline"
          onClick={onOpenDrawer}
        >
          {user?.name || user?.email}
        </button>
      </div>
    </div>
  )
}