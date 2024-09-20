export type IndexedPokemon = {
  name: string;
  url: string;
}

export type ResponsePokemonList = {
  count: number
  next: string | null
  prevois: string | null
  results: IndexedPokemon[]
}

export type ListPokemon = {
  name: string
  url: string
  image: string
  pokedexNumber: number
}

export type IndexedPokemonByType = {
  pokemon: IndexedPokemon;
  slot: string;
}

export type PokemonByTypeListResponse = {
  id: number;
  pokemon: IndexedPokemonByType[];
}

export type IndexedType = {
  name: string;
  url: string;
  color: string;
}

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IndexedPokemon[];
}
