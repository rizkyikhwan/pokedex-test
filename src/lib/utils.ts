import { type ClassValue, clsx } from "clsx";
import { FastAverageColor } from "fast-average-color";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getColorFromUrl(url: string) {
  const fac = new FastAverageColor()
  const color = await fac.getColorAsync(url)

  if (color.error) return null

  return color.hex
}