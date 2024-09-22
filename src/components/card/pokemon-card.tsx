import { MouseEvent, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { LuTrash } from "react-icons/lu";
import PokeballBG from "../../assets/images/pokeball-bg.png";
import { cn, getColorFromUrl } from "../../lib/utils";
import { usePokedexStore } from "../../store/pokedex-store";
import CardLayout from "./card-layout";

interface PokemonCardProps {
  name: string
  image: string
  number: number
}

export default function PokemonCard({
  name,
  image,
  number,
}: PokemonCardProps) {
  const { pokedexList, addPokemon, removePokemon } = usePokedexStore()

  // Check pokemon is already on list for conditional function
  const isHasPokemon = pokedexList.some(val => val.pokedexNumber === number)

  const [pokemonColor, setPokemonColor] = useState<string | undefined>(undefined);

  const handleChange = (e: MouseEvent) => {
    // Prevent following Link to Detail Page
    e.preventDefault()

    if (isHasPokemon) {
      removePokemon({ name, image, pokedexNumber: number })
    } else {
      addPokemon({ name, image, pokedexNumber: number })
    }
  }

  const getPokemonColor = async () => {
    const color = await getColorFromUrl(image);
    if (color) setPokemonColor(color);
  };

  useEffect(() => {
    getPokemonColor()
  }, [number])

  return (
    <CardLayout
      bgColor={pokemonColor}
      classNameParent="transition-colors group overflow-hidden"
      className="flex flex-col justify-end px-1"
    >
      <button
        type="button"
        className={cn("absolute left-2 top-2 text-xs py-1 px-2 flex items-center rounded-full bg-slate-100/40 z-20 disabled:opacity-50", { "bg-rose-200/30": isHasPokemon })}
        onClick={e => handleChange(e)}
      >
        {isHasPokemon ? (
          <LuTrash size={18} className="text-rose-600" />
        ) : (
          <IoAddOutline size={18} className="text-rose-600" />
        )}
        <span className={cn("ml-1 font-semibold", { "text-rose-600": isHasPokemon })}>Pokedex</span>
      </button>
      <img
        src={PokeballBG}
        className="absolute -right-10 md:-right-12 top-0 z-10 w-60 opacity-15"
      />
      <div className="relative flex flex-col md:flex-row justify-center items-center w-full z-10">
        <img
          src={image}
          alt={name}
          className="size-28 md:size-32 drop-shadow-md"
          loading="lazy"
        />
        <div className="flex items-end justify-center bottom-0 inset-x-0 rounded-md">
          <div className="flex flex-col md:items-end items-center">
            <p className="text-xs z-10">#{number}</p>
            <p className="capitalize font-bold text-sm md:text-lg">{name}</p>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute bg-indigo-500 bg-opacity-70 -bottom-10 left-0 w-full group-hover:bottom-0 transition-all py-1">
        <p className="text-sm text-center font-semibold text-white">
          View Pokemon
        </p>
      </div>
    </CardLayout>
  )
}