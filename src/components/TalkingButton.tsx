'use client'

import useTTS from '@/lib/useTTS'
import { cn } from '@/lib/utils'
import { PiSpeakerLowBold } from 'react-icons/pi'

type Props = {
  text: string
  className?: string
}

export default function TalkingButton({ text, className }: Props) {
  const { speak } = useTTS()
  return (
    <button
      className={cn(
        'grid h-10 w-10 place-items-center rounded-lg border-2 border-white bg-pink-100 text-pink-800',
        className,
      )}
      aria-label={text}
      onClick={() => speak(text)}
    >
      <PiSpeakerLowBold className="h-auto w-5" />
    </button>
  )
}
