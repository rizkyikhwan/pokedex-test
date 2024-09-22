import { IoWarningOutline } from "react-icons/io5";

interface ErrorComp {
  showTitle?: boolean
  description: string
}

export default function ErrorComp({ showTitle = true, description }: ErrorComp) {
  return (
    <div
      className="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 border-rose-500/50 text-rose-500 dark:border-rose-500 [&>svg]:text-rose-500"
    >
      <IoWarningOutline size={18} className="text-rose-500" />
      {showTitle && (
        <h5 className="mb-1 font-semibold leading-none tracking-tight">Error</h5>
      )}
      <p className="text-sm">{description}</p>
    </div>
  )
}