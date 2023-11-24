'use client'

import useTTS from '@/lib/useTTS'
import { cn } from '@/lib/utils'
import { PiSpeakerLowBold } from 'react-icons/pi'

type Props = {
  text: string
  className?: string
  language?: string
}

export default function SpeakerButton({ text, className, language }: Props) {
  const { speak } = useTTS(language)
  return (
    <button
      className={cn('btn btn-circle btn-sm h-10 w-10 p-0', className)}
      aria-label={text}
      onClick={() => speak(text)}
    >
      <PiSpeakerLowBold className="h-auto w-5" />
    </button>
  )
}
