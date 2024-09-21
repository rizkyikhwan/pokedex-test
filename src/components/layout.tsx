import { Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();
  const pathName = location.pathname?.split('/');

  const conditionPath = ['pokemon'];
  const includePath = conditionPath.some((el) => pathName?.includes(el));

  return (
    <main
      className={cn({
        "max-w-5xl w-full mx-auto px-2": !includePath
      })}
    >
      <Outlet />
    </main>
  )
}