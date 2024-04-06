import { clsx as clsxOriginal, type ClassValue } from 'clsx'

export const clsx = (...inputs: ClassValue[]) =>
	clsxOriginal(...inputs) || undefined
