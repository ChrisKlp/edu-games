'use client'

import useTTS from '@/lib/useTTS'
import { cn } from '@/lib/utils'
import { PiSpeakerLowBold, PiStopCircleFill } from 'react-icons/pi'

type Props = {
  text: string
  className?: string
  language?: string | null
  variant?: 'normal' | 'big'
}

export default function SpeakerButton({
  text,
  className,
  language,
  variant = 'normal',
}: Props) {
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
      className={cn(
        'btn btn-circle btn-sm h-10 w-10 p-0',
        variant === 'big' && 'h-14 w-14',
        className,
      )}
      aria-label={text}
      onClick={handleClick}
    >
      {speaking ? (
        <PiStopCircleFill
          className={cn('h-auto w-6', variant === 'big' && 'w-8')}
        />
      ) : (
        <PiSpeakerLowBold
          className={cn('h-auto w-5', variant === 'big' && 'w-7')}
        />
      )}
    </button>
  )
}
