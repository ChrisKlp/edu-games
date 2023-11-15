'use client'

import Button from '@/components/Button'
import { useAdditionTo12Store } from '@/lib/AdditionTo12Game/useAdditionTo12Store'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import EndGame from '../EndGameView'
import ProgressBar from '../ProgressBar'
import DicesView from '@/app/policz-kropki/components/DicesView'
import NumbersView from '@/app/dodaj-cyfry/components/NumbersView'

type Props = {
  variant?: 'numbers' | 'dots'
}

export default function AdditionTo12View({ variant = 'dots' }: Props) {
  const { game, points, round, restart, nextRound, endGame } =
    useAdditionTo12Store()

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
          {!!game.numbers.length && variant === 'dots' ? (
            <DicesView numbers={game.numbers} round={round} />
          ) : (
            <NumbersView numbers={game.numbers} round={round} />
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
