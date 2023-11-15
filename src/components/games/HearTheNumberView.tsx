/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useHearTheNumberStore } from '@/lib/HearTheNumberGame/useHearTheNumberStore'
import useTTS from '@/lib/useTTS'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Button from '../Button'
import GameLayout from '../GameLayout'

export default function HearTheNumberView() {
  const { speak, supported } = useTTS()
  const { game, points, round, restart, nextRound, endGame } =
    useHearTheNumberStore()

  useEffect(() => {
    if (supported && game.questionText && !endGame) {
      setTimeout(() => {
        speak(game.questionText)
      }, 300)
    }
  }, [supported, round, endGame])

  useEffect(() => {
    restart()
  }, [restart])

  const handleClick = (item: number) => {
    nextRound(item)
  }

  const progress = round === 1 ? 0 : ((round - 1) / 9) * 100

  return (
    <GameLayout
      endGame={endGame}
      points={points}
      progress={progress}
      restart={restart}
    >
      <div
        key={round}
        className="grid h-full grid-rows-[1fr_auto] items-center gap-8"
      >
        <motion.button
          className="break-all text-7xl font-bold uppercase"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => speak(game.questionText)}
        >
          {game.questionText}
        </motion.button>
        <motion.div
          className="grid grid-cols-4 gap-4"
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
