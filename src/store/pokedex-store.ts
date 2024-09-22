import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Pokedex } from "../types/pokemon.type";

interface UsePokedexStore {
  pokedexList: Pokedex[]
  addPokemon: (pokemon: Pokedex) => void
  removePokemon: (pokemon: Pokedex) => void
}

export const usePokedexStore = create<UsePokedexStore>()(persist((set) => ({
  pokedexList: [],
  addPokemon: (pokemon: Pokedex) => {
    set(state => ({
      pokedexList: [pokemon, ...state.pokedexList]
    }))
  },
  removePokemon: (pokemon: Pokedex) => {
    set(state => ({
      pokedexList: state.pokedexList.filter(v => v.name !== pokemon.name)
    }))
  }
}), {
  name: "pokedex"
}))