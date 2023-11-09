import { cn } from '@/lib/utils'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  isAnswer: boolean
  handleClick: () => void
} & React.HTMLProps<HTMLButtonElement>

export default function Button({
  children,
  className,
  isAnswer,
  handleClick,
}: Props) {
  const [effect, setEffect] = useState('')

  const handleAnimationEnd = () => {
    setEffect('')
    if (isAnswer) handleClick()
  }
  return (
    <button
      className={cn(
        'rounded-xl bg-pink-700 p-3 text-lg text-white',
        effect,
        className,
      )}
      onClick={() => {
        setEffect(isAnswer ? 'animate-jump' : 'animate-wiggle')
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </button>
  )
}
