import { MouseEvent } from "react"
import { FiArrowLeft } from "react-icons/fi"
import { ImSpinner8 } from "react-icons/im"
import { IoAddOutline } from "react-icons/io5"
import { LuRuler, LuTrash } from "react-icons/lu"
import { TbWeight } from "react-icons/tb"
import { useNavigate, useParams } from "react-router-dom"
import ErrorComp from "../components/error-comp"
import Pokedex from "../components/pokedex"
import ProgressBar from "../components/progress-bar"
import usePokemonDetail from "../hooks/usePokemonDetail"
import { cn, statNameMapping } from "../lib/utils"
import { usePokedexStore } from "../store/pokedex-store"

export default function DetailPage() {
  const navigate = useNavigate()
  const { pokeName } = useParams()
  const { pokemon, pokemonSpecies, isLoading, errorMsg } = usePokemonDetail({ pokeName })
  const { pokedexList, addPokemon, removePokemon } = usePokedexStore()

  // Check pokemon is already on list for conditional function
  const isHasPokemon = pokedexList.some(val => val.pokedexNumber === pokemon?.id)

  const handleChange = (e: MouseEvent) => {
    // Prevent following Link to Detail Page
    e.preventDefault()

    if (isHasPokemon) {
      // Note: Maybe should can be improve for this code below of value argument
      removePokemon({ name: pokemon?.name || "", image: pokemon?.image || "", pokedexNumber: pokemon?.id || 0 })
    } else {
      // Note: Maybe should can be improve for this code below of value argument
      addPokemon({ name: pokemon?.name || "", image: pokemon?.image || "", pokedexNumber: pokemon?.id || 0 })
    }
  }

  return (
    <div
      style={{ backgroundColor: pokemon?.color }}
      className={cn(
        "min-h-screen p-8 transition-colors", {
        "flex flex-col justify-center items-center max-w-lg mx-auto": errorMsg
      }
      )}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <ImSpinner8 size={48} className="animate-spin text-indigo-600" />
        </div>
      ) : pokemon ? (
        <>
          <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
            <button
              className="flex items-center justify-center space-x-2 hover:bg-slate-100/20 rounded-md transition px-2"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="text-slate-50" />
              <span className="capitalize text-lg text-slate-50 font-semibold tracking-wide">Back</span>
            </button>
            <div className="flex flex-col items-center space-y-1">
              <h3 className="capitalize text-xl text-slate-50 font-bold tracking-wide">{pokemon.name}</h3>
              <button
                type="button"
                className={cn("text-xs py-1 px-2 flex items-center rounded-full bg-slate-100/40 z-20 disabled:opacity-50", { "bg-rose-200/30": isHasPokemon })}
                onClick={e => handleChange(e)}
              >
                {isHasPokemon ? (
                  <LuTrash size={18} className="text-rose-600" />
                ) : (
                  <IoAddOutline size={18} className="text-rose-600" />
                )}
                <span className={cn("ml-1 font-semibold", { "text-rose-600": isHasPokemon })}>Pokedex</span>
              </button>
            </div>
            <Pokedex qtyBorderColor={pokemon.color} />
          </div>
          <div className="max-w-sm mx-auto relative">
            <div className="relative flex items-center justify-center w-full h-44 mt-2 md:h-40 z-10">
              <img
                src={pokemon.image}
                alt={pokemon.image}
                className="size-44 drop-shadow-md"
                loading="lazy"
              />
            </div>
          </div>
          <div className="px-6 pb-6 pt-14 bg-slate-50 mx-auto max-w-2xl rounded-lg shadow-md -mt-8 space-y-6">
            <div className="flex items-center justify-center space-x-3">
              {pokemon.types.map(({ type }, index) => (
                <span style={{ backgroundColor: pokemon.color }} className="capitalize text-xs py-0.5 px-2.5 rounded-full text-white" key={index}>
                  {type.name}
                </span>
              ))}
            </div>
            <p className="font-bold tracking-wide text-center my-4">About</p>
            <div className="flex min-h-20">
              <div className="space-y-1.5 flex-1 relative before:bg-slate-300 before:h-full before:w-px before:absolute before:top-0 before:right-0 before:m-auto">
                <p className="text-xs text-center font-semibold">Weight</p>
                <div className="flex items-center justify-center space-x-1.5">
                  <TbWeight size={16} className="text-slate-500" />
                  <p className="text-sm">{pokemon.weight / 10} kg</p>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 relative before:bg-slate-300 before:h-full before:w-px before:absolute before:top-0 before:right-0 before:m-auto">
                <p className="text-xs text-center font-semibold">Height</p>
                <div className="flex items-center justify-center space-x-1.5">
                  <LuRuler size={16} className="text-slate-500" />
                  <p className="text-sm">{pokemon.height / 10} m</p>
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                <p className="text-xs text-center font-semibold">Move</p>
                <div className="flex flex-col items-center">
                  {pokemon.abilities.map(({ ability }, index) => (
                    <p key={index} className="capitalize text-xs">{ability.name}</p>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-sm">{pokemonSpecies}</p>
            <div className="space-y-4">
              <p className="text-center font-bold">Base Stats</p>
              {pokemon.stats.map(({ stat, base_stat }, index) => (
                <div key={index}>
                  <p className="text-sm font-semibold">{statNameMapping[stat.name]}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs">{String(base_stat).padStart(3, "0")}</p>
                    <ProgressBar value={base_stat} hexColor={pokemon.color} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <ErrorComp
          showTitle={errorMsg ? true : false}
          description={errorMsg ? errorMsg : "Pokemon not found!"}
        />
      )}
    </div>
  )
}