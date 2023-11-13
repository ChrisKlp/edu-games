import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  isGoodAnswer: boolean
  handleClick: () => void
} & React.HTMLProps<HTMLButtonElement>

const variants = {
  jump: { y: [0, -10, 0], backgroundColor: '#84cc16' },
  wiggle: {
    rotate: [0, 3, -3, 0],
    backgroundColor: ['#9f1239', '#9f1239', '#be185d'],
  },
}

export default function Button({
  children,
  className,
  isGoodAnswer,
  handleClick,
}: Props) {
  const [effect, setEffect] = useState({})

  const handleAnimationEnd = () => {
    setTimeout(() => {
      if (isGoodAnswer) handleClick()
    }, 500)
  }
  return (
    <motion.button
      className={cn(
        'w-full rounded-xl  bg-pink-700 p-3 text-lg text-white',
        effect,
        className,
      )}
      onClick={() => {
        setEffect(isGoodAnswer ? 'jump' : 'wiggle')
      }}
      variants={variants}
      animate={effect}
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleAnimationEnd}
    >
      {children}
    </motion.button>
  )
}
