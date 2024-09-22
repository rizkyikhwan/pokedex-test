import { Link, useNavigate } from "react-router-dom"
import { usePokedexStore } from "../store/pokedex-store"
import PokemonCard from "../components/card/pokemon-card"
import { FiArrowLeft } from "react-icons/fi"
import InputSearch from "../components/input-search"
import { useState } from "react"
import ErrorComp from "../components/error-comp"
import { cn } from "../lib/utils"

export default function PokedexPage() {
  const navigate = useNavigate()
  const { pokedexList } = usePokedexStore()

  const [search, setSearch] = useState("")

  const filteredPokedex = pokedexList.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="my-10 space-y-6">
      <div className="space-y-4">
        <button
          className="flex items-center justify-center space-x-2 hover:bg-slate-100/20 rounded-md transition px-2"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="text-slate-700" />
          <span className="capitalize text-lg text-slate-700 font-semibold">Back</span>
        </button>
        <h1 className="text-2xl font-bold tracking-wide">Pokedex</h1>
        <InputSearch
          value={search}
          setValue={setSearch}
          placeholder="Search Pokemon Name"
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-3", {
          "md:grid-cols-3": filteredPokedex.length < 1 || pokedexList.length < 1
        })}
      >
        {filteredPokedex.length > 0 ? (
          filteredPokedex.map((pokemon, index) => (
            <Link key={index} to={`/pokemon/${pokemon.name}`}>
              <PokemonCard
                key={index}
                name={pokemon.name}
                image={pokemon.image}
                number={pokemon.pokedexNumber}
              />
            </Link>
          ))
        ) : (
          <ErrorComp
            showTitle={false}
            description={pokedexList.length < 1 ? "You don't have pokemon" : "Pokemon not found!"}
          />
        )}
      </div>
    </div>
  )
}