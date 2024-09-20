import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import PokemonLogo from '../assets/images/pokemon-logo.png'
import PokemonCard from '../components/card/pokemon-card'
import SkeletonCard from '../components/card/skeleton-card';
import usePokemonList from '../hooks/usePokemonList';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const {
    pokemonList,
    hasMorePokemon,
    onFirstPage,
    fetchPokemon,
    isLoading
  } = usePokemonList();

  const onChangeList = (action: string) => {
    fetchPokemon(action)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6 my-10 max-w-5xl w-full mx-auto px-2">
      <img src={PokemonLogo} alt="pokemon-logo" className="max-w-72 w-full mx-auto" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {isLoading ? (
          [...Array(20)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          pokemonList.map((pokemon, index) => (
            <Link key={index} to={`/pokemon/${pokemon.pokedexNumber}`}>
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