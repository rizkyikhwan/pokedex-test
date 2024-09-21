import { cn } from "../../lib/utils"

interface CardLayoutProp {
  children: React.ReactNode
  classNameParent?: string
  className?: string
  bgColor?: string
}

export default function CardLayout({ children, classNameParent, className, bgColor }: CardLayoutProp) {
  return (
    <div style={{ backgroundColor: bgColor }} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm w-full", classNameParent)}>
      <div className={cn("relative overflow-hidden py-6 h-64", className)}>
        {children}
      </div>
    </div>
  )
}