/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useListenTheNumberStore } from '@/lib/ListenTheNumberGame/useListenTheNumberStore'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Button from '../AnswerButton'
import GameLayout from '../GameLayout'
import TalkingTitle from '../TalkingTitle'
import { useGameSessionStore } from '@/lib/useGameSessionStore'

export default function HearTheNumberView() {
  const { game, points, restart, nextRound } = useListenTheNumberStore()
  const { round, nextGameRound, endGame, resetSession } = useGameSessionStore()

  function restartGame() {
    restart()
    resetSession()
  }

  useEffect(() => {
    restartGame()
  }, [restart])

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
