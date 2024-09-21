import { GoSearch } from "react-icons/go";

interface InputSearchProps {
  value?: string
  setValue?: (value: string) => void
  placeholder?: string
}

export default function InputSearch({ placeholder, value, setValue = () => { } }: InputSearchProps) {
  return (
    <div className="flex px-4 py-3 rounded-md border-2 border-indigo-500 overflow-hidden max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-gray-600 text-sm"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <GoSearch size={20} className="text-gray-600" />
    </div>
  )
}