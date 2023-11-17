/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Dice from '@/app/policz-kropki/components/Dice'
import { useWhichDiceStore } from '@/lib/WhichDiceGame/useWhichDiceStore'
import { Level } from '@/types'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import GameLayout from '../GameLayout'
import TalkingTitle from '../TalkingTitle'
import AnswerButton from '../AnswerButton'

type Props = {
  level?: Level
}

export default function WhichDiceView({ level = Level.normal }: Props) {
  const { game, points, round, restart, nextRound, endGame, setLevel } =
    useWhichDiceStore()

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
        <TalkingTitle text={game.questionText} />
        <motion.div
          className="grid grid-cols-3 gap-4 pb-6"
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
