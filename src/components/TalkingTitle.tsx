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

  const textToSpeech = text.replace('_', ' ')

  useEffect(() => {
    if (supported && textToSpeech) {
      cancel()
      setTimeout(() => {
        speak(textToSpeech)
      }, 300)
    }
  }, [supported])

  return (
    <motion.button
      className={cn(
        'justify-self-center break-all text-[clamp(48px,15vw,96px)] font-bold uppercase leading-[90%]',
        className,
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => speak(textToSpeech)}
    >
      {textToSpeech}
    </motion.button>
  )
}
