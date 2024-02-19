import { motion } from 'framer-motion'
import Dice from './Dice'

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

export default function DicesView({ numbers, round }: Props) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {numbers.map((dice, i) => (
        <motion.div key={`${round}-dice-${dice}-${i}`} variants={item}>
          <Dice number={dice} />
        </motion.div>
      ))}
    </motion.div>
  )
}
