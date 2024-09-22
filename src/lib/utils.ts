import { type ClassValue, clsx } from "clsx";
import { FastAverageColor } from "fast-average-color";
import { twMerge } from "tailwind-merge";
import { PokemonSpeciesResponse } from "../types/pokemon.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getColorFromUrl(url: string) {
  const fac = new FastAverageColor()
  const color = await fac.getColorAsync(url)

  if (color.error) return null

  return color.hex
}

export const statNameMapping: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

export function getEnglishFlavorText(pokemonSpecies: PokemonSpeciesResponse) {
  for (let entry of pokemonSpecies.flavor_text_entries) {
    if (entry.language.name === "en") {
      let flavor = entry.flavor_text.replace(/\f/g, " ");
      return flavor;
    }
  }
  return "";
}