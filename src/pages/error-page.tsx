import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-rose-500 font-semibold">Page Not Found</p>
      <button
        className="flex items-center justify-center space-x-2 hover:bg-slate-300/20 rounded-md transition px-2 py-1"
        onClick={() => navigate("/")}
      >
        <FiArrowLeft className="text-slate-700" />
        <span className="capitalize text-lg text-slate-700 font-semibold tracking-wide">Pokemon List</span>
      </button>
    </div>
  );
}