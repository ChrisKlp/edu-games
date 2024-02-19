/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useTTS from '@/lib/useTTS'
import { useEffect } from 'react'
import FadeInImage from './FadeInImage'

type Props = {
  text: string
  className?: string
  language?: string
  src: string
  size?: number
}

export default function TalkingFadeInImage({
  text,
  className,
  language = 'pl-PL',
  src,
  size = 150,
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
    <button className={className} onClick={() => speak(textToSpeech)}>
      <FadeInImage src={src} alt={text} width={size} height={size} />
    </button>
  )
}
