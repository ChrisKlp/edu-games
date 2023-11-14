'use client'

import { fetcher, getRandomArbitrary } from '@/lib/utils'
import Image from 'next/image'
import { useRef, useState } from 'react'
import useSWR from 'swr'
import Spinner from './Spinner'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
}

export default function Pokemon() {
  const id = useRef(getRandomArbitrary(1, 1292))
  const [isLoaded, setIsLoaded] = useState(false)

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
    <motion.div
      className="grid gap-4"
      variants={variants}
      initial="hidden"
      animate={isLoaded && 'visible'}
    >
      <Image
        priority
        width={400}
        height={400}
        src={pokemonData.sprites.other['official-artwork'].front_default}
        alt={name}
        onLoad={() => setIsLoaded(true)}
      />
      <p className="text-center font-bold">{name.toUpperCase()}</p>
    </motion.div>
  )
}
