import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(classes));
