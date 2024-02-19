/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AnswerButton from '@/components/games/AnswerButton'
import DicesView from '@/components/games/DicesView'
import GameLayout from '@/components/games/GameLayout'
import NumbersView from '@/components/games/NumbersView'
import { useAdditionTo12Store } from '@/lib/games/AdditionTo12/useAdditionTo12Store'
import useGameController from '@/lib/useGameController'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { Level } from '@/types'
import { Game } from '@prisma/client'
import { motion } from 'framer-motion'

type Props = {
  variant?: 'numbers' | 'dots'
  level?: Level
  data: Game
}

export default function AdditionTo12View({
  variant = 'dots',
  level = Level.normal,
  data,
}: Props) {
  const { game, points, restart, nextRound, setLevel } = useAdditionTo12Store()
  const { round, nextGameRound, endGame, resetSession, setMaxRounds } =
    useGameSessionStore()
  const { handleClick, restartGame } = useGameController({
    init: () => {
      setLevel(level)
      setMaxRounds(10)
    },
    restart,
    resetSession,
    nextGameRound,
    nextRound,
  })

  return (
    <GameLayout
      gameId={data.id}
      endGame={endGame}
      points={points}
      round={round}
      restart={restartGame}
    >
      <div
        key={round}
        className="grid h-full grid-rows-[1fr_auto] items-center gap-8 "
      >
        {!!game.numbers.length && variant === 'dots' ? (
          <DicesView numbers={game.numbers} round={round} />
        ) : (
          <NumbersView numbers={game.numbers} round={round} />
        )}
        <motion.div
          className="grid w-full max-w-screen-lg grid-cols-2 gap-4 justify-self-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {game.answers.map((answer, i) => (
            <AnswerButton
              key={`${round}-answer-${answer}-${i}`}
              isGoodAnswer={answer === game.questionNumber}
              handleClick={() => handleClick(answer)}
            >
              {answer}
            </AnswerButton>
          ))}
        </motion.div>
      </div>
    </GameLayout>
  )
}
