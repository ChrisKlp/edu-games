/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useTTS from '@/lib/useTTS'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  text: string
  className?: string
}

export default function TalkingTitle({ text, className }: Props) {
  const { speak, supported } = useTTS()

  useEffect(() => {
    if (supported && text) {
      setTimeout(() => {
        speak(text)
      }, 300)
    }
  }, [supported])

  return (
    <motion.button
      className={cn('break-all text-7xl font-bold uppercase', className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => speak(text)}
    >
      {text}
    </motion.button>
  )
}
