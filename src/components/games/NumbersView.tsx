import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

type Props = {
  numbers: number[]
  round: number
}

export default function NumbersView({ numbers, round }: Props) {
  const items = numbers.map((num, i) => (i === 0 ? [num] : ['+', num]))

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((num, i) => (
        <motion.div
          key={`${round}-dice-${num}-${i}`}
          variants={item}
          className="flex items-center justify-center gap-4"
        >
          {num.map((el, index) => (
            <span
              key={`${el}-${index}`}
              className={cn(
                'block text-9xl font-bold text-pink-700',
                el === '+' && 'text-7xl text-sky-600',
              )}
            >
              {el}
            </span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}
