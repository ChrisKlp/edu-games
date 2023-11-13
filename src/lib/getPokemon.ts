import { getRandomArbitrary } from './utils'

export default async function getPokemon() {
  const id = getRandomArbitrary(1, 1292)
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${id}&limit=1`,
  )
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  const nextUrl = data?.results[0]?.url

  const pokemon = await fetch(nextUrl)

  if (!pokemon.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch pokemon data')
  }

  return pokemon.json()
}
