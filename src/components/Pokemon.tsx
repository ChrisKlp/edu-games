'use client'

import getPokemon from '@/lib/getPokemon'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<any>(null)
  const [firstRender, setFirstRender] = useState(false)

  const fetchData = async () => {
    const result = await getPokemon()
    setPokemon(result)
  }

  useEffect(() => {
    setFirstRender(true)
    if (firstRender) {
      fetchData()
    }
  }, [firstRender])

  if (!pokemon) return null

  return (
    <Image
      priority
      width={200}
      height={200}
      src={pokemon.sprites.other['official-artwork'].front_default}
      alt={pokemon.name}
    />
  )
}
