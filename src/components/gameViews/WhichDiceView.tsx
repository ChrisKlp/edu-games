/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AnswerButton from '@/components/game/AnswerButton'
import GameLayout from '@/components/game/GameLayout'
import TalkingTitle from '@/components/TalkingTitle'
import Dice from '@/components/game/Dice'
import { useWhichDiceStore } from '@/lib/WhichDiceGame/useWhichDiceStore'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { Level } from '@/types'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  level?: Level
}

export default function WhichDiceView({ level = Level.normal }: Props) {
  const { game, points, restart, nextRound, setLevel } = useWhichDiceStore()
  const { round, nextGameRound, endGame, resetSession } = useGameSessionStore()

  function restartGame() {
    restart()
    resetSession()
  }

  useEffect(() => {
    setLevel(level)
    restartGame()
  }, [])

  const handleClick = (item: number) => {
    nextRound(item)
    nextGameRound()
  }

  return (
    <GameLayout
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
