/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import TalkingTitle from '@/components/TalkingTitle'
import AnswerButton from '@/components/game/AnswerButton'
import Dice from '@/components/game/Dice'
import GameLayout from '@/components/game/GameLayout'
import { useWhichDiceStore } from '@/lib/WhichDiceGame/useWhichDiceStore'
import useGameController from '@/lib/useGameController'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { Level } from '@/types'
import { Game } from '@prisma/client'
import { motion } from 'framer-motion'

type Props = {
  level?: Level
  data: Game
}

export default function WhichDiceView({ level = Level.normal, data }: Props) {
  const { game, points, restart, nextRound, setLevel } = useWhichDiceStore()
  const { round, nextGameRound, endGame, resetSession } = useGameSessionStore()
  const { handleClick, restartGame } = useGameController({
    init: () => setLevel(level),
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
        className="grid h-full grid-rows-[1fr_auto] items-center gap-8"
      >
        <TalkingTitle text={game.questionText} />
        <motion.div
          className="grid w-full max-w-screen-lg grid-cols-3 gap-4 justify-self-center
          pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {game.answers.map(({ id, answer, numbers }) => (
            <AnswerButton
              key={id}
              type="image"
              isGoodAnswer={answer === game.questionNumber}
              handleClick={() => handleClick(answer)}
            >
              <span className="flex flex-col items-center justify-center gap-1 md:flex-row">
                {numbers.map((num, ind) => (
                  <Dice
                    number={num}
                    key={`${id}-${num}-${ind}`}
                    className="max-w-[75px] drop-shadow-xl sm:max-w-[75px] md:max-w-[90px]"
                  />
                ))}
              </span>
            </AnswerButton>
          ))}
        </motion.div>
      </div>
    </GameLayout>
  )
}
