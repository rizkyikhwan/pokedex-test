import axios from "axios";
import { useEffect, useState } from "react";
import { IndexedPokemon, ListPokemon, PokemonListResponse } from "../types/pokemon.type";
import { POKEMON_API_BASE_URL, POKEMON_IMAGES_BASE_URL } from "../lib/constants";

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<ListPokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string | null>(`${POKEMON_API_BASE_URL}/pokemon?limit=20`)
  const [prevUrl, setPrevUrl] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)

  const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
    const pokedexNumber = parseInt(
      indexedPokemon.url
        .replace(`${POKEMON_API_BASE_URL}/pokemon/`, "")
        .replace("/", "")
    );

    const listPokemon: ListPokemon = {
      name: indexedPokemon.name,
      url: indexedPokemon.url,
      image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}.png`,
      pokedexNumber,
    };

    return listPokemon;
  };

  const fetchPokemon = async (action?: string) => {
    setIsLoading(true)

    if (action == "prev") {
      if (prevUrl) {
        const result = await axios.get<PokemonListResponse>(prevUrl);

        if (result?.data?.results) {
          const listPokemons = result.data.results.map((p) =>
            indexedPokemonToListPokemon(p)
          );
          setPokemonList(listPokemons);
          setNextUrl(result.data.next);
          setPrevUrl(result.data.previous)
        }
      }
    } else {
      if (nextUrl) {
        const result = await axios.get<PokemonListResponse>(nextUrl);

        if (result?.data?.results) {
          const listPokemons = result.data.results.map((p) =>
            indexedPokemonToListPokemon(p)
          );
          setPokemonList(listPokemons);
          setNextUrl(result.data.next);
          setPrevUrl(result.data.previous)

        }
      }
    }

    setIsLoading(false)
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemonList,
    fetchPokemon,
    hasMorePokemon: !!!nextUrl,
    onFirstPage: !!!prevUrl,
    isLoading,
    setPokemonList,
  };
}

export default usePokemonList