import CardLayout from "./card-layout";

export default function SkeletonCard() {
  return (
    <CardLayout classNameParent="animate-pulse overflow-hidden">
      <div className="absolute top-0 left-0 bg-slate-200 w-full h-full "></div>
    </CardLayout>
  )
}