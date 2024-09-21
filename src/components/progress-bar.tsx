export default function ProgressBar({ value = 0, hexColor = "#10b981" }) {
  return (
    <div className="relative w-full">
      <div className="flex h-1.5 overflow-hidden text-sm bg-gray-200 rounded">
        <div style={{ width: `${value}%`, backgroundColor: hexColor }} className="rounded" />
      </div>
    </div>
  )
}
