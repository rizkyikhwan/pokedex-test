import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { Link } from 'react-router-dom';
import PokemonLogo from '../assets/images/pokemon-logo.png';
import PokemonCard from '../components/card/pokemon-card';
import SkeletonCard from '../components/card/skeleton-card';
import usePokemonList from '../hooks/usePokemonList';
import { useState } from 'react';
import { ListPokemon } from '../types/pokemon.type';

export default function HomePage() {
  const {
    pokemonList,
    hasMorePokemon,
    onFirstPage,
    fetchPokemon,
    isLoading
  } = usePokemonList();

  const [filteredPokemon, setFilteredPokemon] = useState<ListPokemon[]>(pokemonList)
  // const [search, setSearch] = useState("")
  console.log(pokemonList)

  const onHandleChange = (val: string) => {
    return setFilteredPokemon(pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(val)))
  }

  const onChangeList = (action: string) => {
    fetchPokemon(action)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6 my-10">
      <div className="space-y-5">
        <img src={PokemonLogo} alt="pokemon-logo" className="max-w-40 md:max-w-72 w-full" />
        <div className="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md">
          <input
            type="text"
            placeholder="Search Name Pokemon"
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
            onChange={e => onHandleChange(e.target.value)}
          />
          <GoSearch size={20} className="text-gray-600" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {isLoading ? (
          [...Array(20)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          filteredPokemon.map((pokemon, index) => (
            <Link key={index} to={`/pokemon/${pokemon.name}`}>
              <PokemonCard
                key={index}
                name={pokemon.name}
                image={pokemon.image}
                number={pokemon.pokedexNumber}
              />
            </Link>
          ))
        )}
      </div>
      <div className="flex items-center justify-center md:justify-start space-x-2 pt-2">
        <button
          className="button flex items-center space-x-1 w-28"
          onClick={() => onChangeList("prev")}
          disabled={onFirstPage}
        >
          <FiArrowLeft />
          <span>Prev</span>
        </button>
        <button
          className="button flex items-center space-x-1 w-28"
          onClick={() => onChangeList("next")}
          disabled={hasMorePokemon}
        >
          <span>Next</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  )
}