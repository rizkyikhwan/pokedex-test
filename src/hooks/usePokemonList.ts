import axios from "axios";
import { useEffect, useState } from "react";
import { IndexedPokemon, ListPokemon, PokemonListResponse } from "../types/pokemon.type";

const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_IMAGES_BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<ListPokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string | null>(`${POKEMON_API_BASE_URL}/pokemon?limit=20`)
  // const [prevUrl, setPrevUrl] = useState<string | null>(`${POKEMON_API_BASE_URL}/pokemon`)
  const [prevUrl, setPrevUrl] = useState<string | null>()
  // const [selectedType, setSelectedType] = useState<IndexedType | null>(null);
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
    if (action == "prev") {
      if (prevUrl) {
        setIsLoading(true)

        const result = await axios.get<PokemonListResponse>(prevUrl);

        if (result?.data?.results) {
          const listPokemons = result.data.results.map((p) =>
            indexedPokemonToListPokemon(p)
          );
          // setPokemonList([...pokemonList, ...listPokemons]);
          setPokemonList(listPokemons);
          setNextUrl(result.data.next);
          setPrevUrl(result.data.previous)
          setIsLoading(false)
        }
      }
    } else {
      if (nextUrl) {
        setIsLoading(true)

        const result = await axios.get<PokemonListResponse>(nextUrl);

        if (result?.data?.results) {
          const listPokemons = result.data.results.map((p) =>
            indexedPokemonToListPokemon(p)
          );
          // setPokemonList([...pokemonList, ...listPokemons]);
          setPokemonList(listPokemons);
          setNextUrl(result.data.next);
          setPrevUrl(result.data.previous)

          setIsLoading(false)
        }
      }
    }
  };

  // const fetchPokemonsByType = async () => {
  //   if (selectedType) {
  //     const result = await axios.get<PokemonByTypeListResponse>(
  //       selectedType.url
  //     );
  //     if (result?.data?.pokemon) {
  //       const listPokemons = result.data.pokemon.map((p) =>
  //         indexedPokemonToListPokemon(p.pokemon)
  //       );
  //       setPokemonList(listPokemons);
  //       setNextUrl(`${POKEMON_API_BASE_URL}/pokemon`);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (selectedType) {
  //     fetchPokemonsByType();
  //   } else {
  //     fetchPokemon();
  //   }
  // }, [selectedType]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemonList,
    fetchPokemon,
    hasMorePokemon: !!!nextUrl,
    onFirstPage: !!!prevUrl,
    isLoading,
    // selectedType,
    // setSelectedType,
    setPokemonList,
  };
}

export default usePokemonList