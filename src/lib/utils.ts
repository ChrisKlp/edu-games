import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleArray<T>(array: T[]) {
  return array
    .map((value, i) => ({ value, sort: Math.floor(Math.random() * (i + 1)) }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getArray(length: number) {
  return Array.from(Array(length).keys())
}