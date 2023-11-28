'use client'

import useTTS from '@/lib/useTTS'
import { cn } from '@/lib/utils'
import { PiSpeakerLowBold, PiStopCircleBold } from 'react-icons/pi'

type Props = {
  text: string
  className?: string
  language?: string
}

export default function SpeakerButton({ text, className, language }: Props) {
  const { speak, speaking, cancel } = useTTS(language)

  const handleClick = () => {
    if (speaking) {
      cancel()
    } else {
      speak(text)
    }
  }

  return (
    <button
      className={cn('btn btn-circle btn-sm h-10 w-10 p-0', className)}
      aria-label={text}
      onClick={handleClick}
    >
      {speaking ? (
        <PiStopCircleBold className="h-auto w-6" />
      ) : (
        <PiSpeakerLowBold className="h-auto w-5" />
      )}
    </button>
  )
}
