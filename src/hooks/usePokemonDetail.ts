import axios from "axios"
import { useEffect, useState } from "react"
import { getColorFromUrl, getEnglishFlavorText } from "../lib/utils"
import { DetailPokemon } from "../types/pokemon.type"
import { POKEMON_API_BASE_URL, POKEMON_IMAGES_BASE_URL, POKEMON_SPECIES_API_BASE_URL } from "../lib/constants"

const usePokemonDetail = ({ pokeName }: { pokeName: string | undefined }) => {
  const [pokemon, setPokemon] = useState<DetailPokemon | null>(null)
  const [pokemonSpecies, setPokemonSpecies] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchPokemon = async (name: string) => {
    setIsLoading(true)

    if (pokeName) {
      const result = await axios.get<DetailPokemon>(`${POKEMON_API_BASE_URL}/pokemon/${name}`)
      const resultSpecies = await axios.get<Record<string, any>>(`${POKEMON_SPECIES_API_BASE_URL}/${name}`)

      if (result.data && resultSpecies.data) {

        setPokemon({ ...result.data, image: `${POKEMON_IMAGES_BASE_URL}/${result.data.id}.png` })
        setPokemonSpecies(getEnglishFlavorText(resultSpecies.data))
      }
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
    if (pokeName) fetchPokemon(pokeName)
  }, [pokeName])

  useEffect(() => {
    if (pokemon) getPokemonColor()
  }, [pokemon])

  return { pokemon, pokemonSpecies, isLoading }
}
export default usePokemonDetail