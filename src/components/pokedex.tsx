import { usePokedexStore } from "../store/pokedex-store"
import Pokeball from '../assets/images/pokeball.png'
import { useNavigate } from "react-router-dom"

interface PokedexProps {
  qtyBorderColor?: string
}

export default function Pokedex({ qtyBorderColor = "#fff" }: PokedexProps) {
  const navigate = useNavigate()
  const { pokedexList } = usePokedexStore()

  return (
    <div>
      <button
        type="button"
        className="relative hover:bg-slate-100/20 rounded-md transition"
        onClick={() => navigate("/pokedex")}
      >
        {pokedexList.length > 0 && (
          <span
            style={{ borderColor: qtyBorderColor }}
            className="absolute -top-1 -right-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full size-[22px] flex items-center justify-center border-2"
          >
            {pokedexList.length}
          </span>
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