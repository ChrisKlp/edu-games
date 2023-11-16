/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import NumbersView from '@/app/dodaj-cyfry/components/NumbersView'
import DicesView from '@/app/policz-kropki/components/DicesView'
import Button from '@/components/Button'
import { useAdditionTo12Store } from '@/lib/AdditionTo12Game/useAdditionTo12Store'
import { Level } from '@/types'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import GameLayout from '../GameLayout'

type Props = {
  variant?: 'numbers' | 'dots'
  level?: Level
}

export default function AdditionTo12View({
  variant = 'dots',
  level = Level.normal,
}: Props) {
  const { game, points, round, restart, nextRound, endGame, setLevel } =
    useAdditionTo12Store()

  useEffect(() => {
    setLevel(level)
    restart()
  }, [])

  const handleClick = (item: number) => {
    nextRound(item)
  }

  return (
    <GameLayout
      endGame={endGame}
      points={points}
      round={round}
      restart={restart}
    >
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
    </GameLayout>
  )
}
