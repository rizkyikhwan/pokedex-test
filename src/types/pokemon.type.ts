export type IndexedPokemon = {
  name: string;
  url: string;
}

export type ListPokemon = {
  name: string
  url: string
  image: string
  pokedexNumber: number
}

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IndexedPokemon[];
}

export type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export type PokemonStat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export type DetailPokemon = {
  id: number
  name: string
  image: string
  types: PokemonType[]
  weight: number
  height: number
  abilities: PokemonAbility[]
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  }
  stats: PokemonStat[]
  color: string
}