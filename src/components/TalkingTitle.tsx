/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useTTS from '@/lib/useTTS'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  text: string
  className?: string
  language?: string
}

export default function TalkingTitle({
  text,
  className,
  language = 'pl-PL',
}: Props) {
  const { speak, supported, cancel } = useTTS(language)

  useEffect(() => {
    if (supported && text) {
      cancel()
      setTimeout(() => {
        speak(text)
      }, 300)
    }
  }, [supported])

  return (
    <motion.button
      className={cn(
        'justify-self-center break-all p-4 text-7xl font-bold uppercase',
        className,
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => speak(text)}
    >
      {text}
    </motion.button>
  )
}
