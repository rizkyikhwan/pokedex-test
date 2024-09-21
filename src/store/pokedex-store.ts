import { create } from "zustand";
import { ListPokedex } from "../types/pokemon.type";

interface UsePokedexStore {
  pokedexList: ListPokedex[]
  addPokemon: (pokemon: ListPokedex) => void
  removePokemon: (pokemon: ListPokedex) => void
}

export const usePokedexStore = create<UsePokedexStore>((set) => ({
  pokedexList: [],
  addPokemon: (pokemon: ListPokedex) => {
    set(state => ({
      pokedexList: [...state.pokedexList, pokemon]
    }))
  },
  removePokemon: (pokemon: ListPokedex) => {
    set(state => ({
      pokedexList: state.pokedexList.filter(v => v.name !== pokemon.name)
    }))
  }
}))