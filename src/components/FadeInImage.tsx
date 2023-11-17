'use client'

import { fetcher, getRandomArbitrary } from '@/lib/utils'
import Image from 'next/image'
import { useRef, useState } from 'react'
import useSWR from 'swr'
import Spinner from './Spinner'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

type Props = {
  src: string
  alt: string
  width: number
  height: number
}

export default function FadeInImage({ src, alt, width, height }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isLoaded && 'visible'}
      className="overflow-hidden rounded-xl drop-shadow-xl"
    >
      <Image
        priority
        width={width}
        height={height}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className=""
      />
    </motion.div>
  )
}
