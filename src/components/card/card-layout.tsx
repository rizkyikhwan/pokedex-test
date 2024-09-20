import { cn } from "../../lib/utils"

interface CardLayoutProp {
  children: React.ReactNode
  className?: string
  bgColor?: string
}

export default function CardLayout({ children, className, bgColor }: CardLayoutProp) {
  return (
    <div style={{ backgroundColor: bgColor }} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm w-full", className)}>
      <div className="relative overflow-hidden pt-6 h-64">
        {children}
      </div>
    </div>
  )
}