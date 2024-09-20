import { useEffect, useState } from "react";
import Pokeball from "../../assets/images/pokeball.png";
import { getColorFromUrl } from "../../lib/utils";
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
  const [pokemonColor, setPokemonColor] = useState<string | undefined>(undefined);

  const getPokemonColor = async () => {
    const color = await getColorFromUrl(image);
    if (color) setPokemonColor(color);
  };

  useEffect(() => {
    getPokemonColor()
  }, [name])

  return (
    <CardLayout bgColor={pokemonColor} className="transition-colors group overflow-hidden">
      <img
        src={Pokeball}
        className="absolute -right-10 md:-right-12 top-0 z-10 w-60 opacity-15"
      />
      <div className="relative flex justify-center items-center w-full z-10">
        <img
          src={image}
          alt={name}
          className="size-32 drop-shadow-md"
          loading="lazy"
        />
      </div>
      <div className="flex items-end justify-center bottom-0 inset-x-0 rounded-md">
        <div className="flex flex-col items-center space-y-1">
          <p className="text-xs z-10">#{number}</p>
          <p className="capitalize font-bold text-lg">{name}</p>
        </div>
      </div>
      <div className="hidden md:block absolute bg-indigo-500 bg-opacity-70 -bottom-10 w-full group-hover:bottom-0 group-hover:left-0 transition-all py-1">
        <p className="text-sm text-center font-semibold text-white">
          View Pokemon
        </p>
      </div>
    </CardLayout>
  )
}