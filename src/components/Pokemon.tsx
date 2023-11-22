'use client'

import { fetcher, getRandomArbitrary } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import useSWR from 'swr'
import Spinner from './Spinner'

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
}

export default function Pokemon() {
  const randomId = useRef(getRandomArbitrary(1, 1292))

  const [isLoaded, setIsLoaded] = useState(false)

  const { data, error, isLoading } = useSWR<{ name: string; image: string }>(
    `/api/pokemon?randomId=${randomId.current}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )
  if (error) return <div>Problem z ładowaniem 🙄</div>
  if (isLoading) return <Spinner />

  return data ? (
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
        src={data.image}
        alt={data.name}
        onLoad={() => setIsLoaded(true)}
      />
      <p className="text-center font-bold">{data.name.toUpperCase()}</p>
    </motion.div>
  ) : null
}
