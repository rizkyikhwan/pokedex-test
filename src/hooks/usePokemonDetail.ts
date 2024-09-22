import axios from "axios"
import request from "axios"
import { useEffect, useRef, useState } from "react"
import { getColorFromUrl, getEnglishFlavorText } from "../lib/utils"
import { DetailPokemon, PokemonSpeciesResponse } from "../types/pokemon.type"
import { POKEMON_API_BASE_URL, POKEMON_IMAGES_BASE_URL, POKEMON_SPECIES_API_BASE_URL } from "../lib/constants"

const usePokemonDetail = ({ pokeName }: { pokeName: string | undefined }) => {
  const effectRun = useRef(false)

  const [pokemon, setPokemon] = useState<DetailPokemon | null>(null)
  const [pokemonSpecies, setPokemonSpecies] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const fetchPokemon = async (name: string) => {
    setIsLoading(true)

    try {
      if (pokeName) {
        const result = await axios.get<DetailPokemon>(`${POKEMON_API_BASE_URL}/pokemon/${name}`)
        const resultSpecies = await axios.get<PokemonSpeciesResponse>(`${POKEMON_SPECIES_API_BASE_URL}/${name}`)

        if (result.data && resultSpecies.data) {
          setPokemon({ ...result.data, image: `${POKEMON_IMAGES_BASE_URL}/${result.data.id}.png` })
          setPokemonSpecies(getEnglishFlavorText(resultSpecies.data))
        }
      }

      setErrorMsg(null)
    } catch (error) {
      if (request.isAxiosError(error) && error.message) {
        setErrorMsg(error.message)
      }
      console.log(error)
    }

    setIsLoading(false)
  }

  const getPokemonColor = async () => {
    if (pokemon?.image) {
      const color = await getColorFromUrl(pokemon.image)

      if (color) setPokemon({ ...pokemon, color })
    }
  }

  useEffect(() => {
    if (pokeName) {
      effectRun.current === false && fetchPokemon(pokeName)
    }

    return () => {
      effectRun.current = true
    }
  }, [pokeName])

  useEffect(() => {
    if (pokemon) getPokemonColor()
  }, [pokemon])

  return { pokemon, pokemonSpecies, isLoading, errorMsg }
}
export default usePokemonDetail