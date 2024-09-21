import { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PokemonLogo from '../assets/images/pokemon-logo.png';
import PokemonCard from '../components/card/pokemon-card';
import SkeletonCard from '../components/card/skeleton-card';
import ErrorComp from '../components/error-comp';
import InputSearch from '../components/input-search';
import usePokemonList from '../hooks/usePokemonList';
import { cn } from '../lib/utils';

export default function HomePage() {
  const {
    pokemonList,
    hasMorePokemon,
    onFirstPage,
    fetchPokemon,
    isLoading
  } = usePokemonList();

  const [search, setSearch] = useState("")

  const filteredPokemon = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))

  const onChangeList = (action: string) => {
    fetchPokemon(action)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6 my-10">
      <div className="space-y-5">
        <img src={PokemonLogo} alt="pokemon-logo" className="max-w-40 md:max-w-72 w-full" />
        <InputSearch
          value={search}
          setValue={setSearch}
          placeholder="Search Name Pokemon"
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-3", {
          "md:grid-cols-2": filteredPokemon.length < 1 && !isLoading
        })}
      >
        {isLoading ? (
          [...Array(20)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          filteredPokemon.length > 0 ? (
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
          ) : (
            <ErrorComp
              description="Pokemon not found!"
            />
          )
        )}
      </div>
      <div className="flex items-center justify-center md:justify-start space-x-2 pt-2">
        <button
          className="button flex items-center space-x-1 w-28"
          onClick={() => onChangeList("prev")}
          disabled={onFirstPage || filteredPokemon.length < 1}
        >
          <FiArrowLeft />
          <span>Prev</span>
        </button>
        <button
          className="button flex items-center space-x-1 w-28"
          onClick={() => onChangeList("next")}
          disabled={hasMorePokemon || filteredPokemon.length < 1}
        >
          <span>Next</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  )
}