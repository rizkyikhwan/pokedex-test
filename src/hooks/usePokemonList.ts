import axios from "axios";
import request from "axios"
import { useEffect, useRef, useState } from "react";
import { IndexedPokemon, ListPokemon, PokemonListResponse } from "../types/pokemon.type";
import { POKEMON_API_BASE_URL, POKEMON_IMAGES_BASE_URL } from "../lib/constants";

const usePokemonList = () => {
  const effectRun = useRef(false)

  const [pokemonList, setPokemonList] = useState<ListPokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string | null>(`${POKEMON_API_BASE_URL}/pokemon?limit=20`)
  const [prevUrl, setPrevUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
    // Get number of pokemon and parse to integer
    const pokedexNumber = parseInt(indexedPokemon.url.replace(`${POKEMON_API_BASE_URL}/pokemon/`, ""))

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

    // Conditional for navigate to next page or previous page
    // Note: Maybe there is a better approach or way for the code below
    if (action == "prev") {
      if (prevUrl) {
        try {
          const result = await axios.get<PokemonListResponse>(prevUrl);

          if (result?.data?.results) {
            const listPokemons = result.data.results.map((p) =>
              indexedPokemonToListPokemon(p)
            );
            setPokemonList(listPokemons);
            setNextUrl(result.data.next);
            setPrevUrl(result.data.previous)
          }

          setErrorMsg(null)
        } catch (error) {
          if (request.isAxiosError(error) && error.message) {
            setErrorMsg(error.message)
          }
          console.log(error)
        }
      }
    } else {
      if (nextUrl) {
        try {
          const result = await axios.get<PokemonListResponse>(nextUrl);

          if (result?.data?.results) {
            const listPokemons = result.data.results.map((p) => indexedPokemonToListPokemon(p));
            setPokemonList(listPokemons);
            setNextUrl(result.data.next);
            setPrevUrl(result.data.previous)

          }

          setErrorMsg(null)
        } catch (error) {
          if (request.isAxiosError(error) && error.message) {
            setErrorMsg(error.message)
          }
          console.log(error)
        }
      }
    }

    setIsLoading(false)
  };

  useEffect(() => {
    effectRun.current === false && fetchPokemon();

    return () => {
      effectRun.current = true
    }
  }, []);

  return {
    pokemonList,
    fetchPokemon,
    hasMorePokemon: !!!nextUrl,
    onFirstPage: !!!prevUrl,
    isLoading,
    errorMsg,
    setPokemonList,
  };
}

export default usePokemonList