'use client'

import { fetcher, getRandomArbitrary } from '@/lib/utils'
import Image from 'next/image'
import { useRef } from 'react'
import useSWR from 'swr'
import Spinner from './Spinner'

export default function Pokemon() {
  const id = useRef(getRandomArbitrary(1, 1292))

  const {
    data: pokemonList,
    error: listError,
    isLoading: listIsLoading,
  } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?offset=${id.current}&limit=1`,
    fetcher,
  )
  const {
    data: pokemonData,
    error: dataError,
    isLoading: dataIsLoading,
  } = useSWR(pokemonList?.results[0]?.url, fetcher)

  if (listError || dataError) return <div>failed to load</div>
  if (listIsLoading || dataIsLoading) return <Spinner />

  const { name }: { name: string } = pokemonData

  return (
    <div className="grid gap-4">
      <Image
        priority
        width={250}
        height={250}
        src={pokemonData.sprites.other['official-artwork'].front_default}
        alt={name}
      />
      <p className="text-center font-bold">{name.toUpperCase()}</p>
    </div>
  )
}
