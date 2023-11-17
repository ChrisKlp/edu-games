import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  isGoodAnswer: boolean
  type?: 'image' | 'text'
  handleClick: () => void
}

export default function Button({
  children,
  className,
  isGoodAnswer,
  type = 'text',
  handleClick,
}: Props) {
  const [effect, setEffect] = useState({})

  const variants: any = {
    jump: { y: [0, -10, 0] },
    wiggle: { rotate: [0, 3, -3, 0] },
  }

  if (type === 'text') {
    variants.jump.backgroundColor = '#84cc16'
    variants.wiggle.backgroundColor = ['#9f1239', '#9f1239', '#be185d']
  }

  const handleAnimationEnd = () => {
    setTimeout(() => {
      handleClick()
    }, 300)
  }

  return (
    <motion.button
      className={cn(
        'flex w-full justify-center',
        type === 'text' && 'rounded-xl  bg-pink-700 p-3 text-lg text-white',
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
