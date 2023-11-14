'use client'

import Button from '@/components/Button'
import { useCountDotsStore } from '@/lib/countDotsGame/useCountDotsStore'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Dice from './Dice'
import EndGame from './EndGame'
import ProgressBar from '../../../components/ProgressBar'
import NoSSRWrapper from '@/components/NoSSRWrapper'

type Props = {
  game?: {
    questionNumber: number
    answers: number[]
    dices: number[]
  }
}

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

export default function CountDotsView({}: Props) {
  const { game, points, round, restart, nextRound, endGame } =
    useCountDotsStore()

  useEffect(() => {
    restart()
  }, [restart])

  const handleClick = (item: number) => {
    nextRound(item)
  }

  const progress = round === 1 ? 0 : ((round - 1) / 9) * 100

  return (
    <div className="container grid h-full grid-rows-[auto_1fr] gap-8">
      <ProgressBar value={progress} />
      {!endGame ? (
        <div
          key={round}
          className="grid h-full grid-rows-[1fr_auto] items-center gap-8"
        >
          {!!game.dices.length && (
            <motion.div
              className="flex flex-wrap justify-center gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {game.dices.map((dice, i) => (
                <motion.div key={`${round}-dice-${dice}-${i}`} variants={item}>
                  <Dice number={dice} />
                </motion.div>
              ))}
            </motion.div>
          )}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {game.answers.map((answer, i) => (
              <Button
                key={`${round}-answer-${answer}-${i}`}
                isGoodAnswer={answer === game.questionNumber}
                handleClick={() => handleClick(answer)}
              >
                {answer}
              </Button>
            ))}
          </motion.div>
        </div>
      ) : (
        <EndGame onClick={restart} points={points} />
      )}
    </div>
  )
}
