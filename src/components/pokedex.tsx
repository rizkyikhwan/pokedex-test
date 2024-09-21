import { usePokedexStore } from "../store/pokedex-store"
import Pokeball from '../assets/images/pokeball.png'

export default function Pokedex() {
  const { pokedexList } = usePokedexStore()

  return (
    <div>
      <button
        type="button"
        className="relative hover:bg-slate-100/20 rounded-md transition"
      >
        {pokedexList.length > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full size-[22px] flex items-center justify-center border-2 border-white">{pokedexList.length}</span>
        )}
        <img
          src={Pokeball}
          alt="pokeball"
          className="size-10"
        />
      </button>
    </div>
  )
}