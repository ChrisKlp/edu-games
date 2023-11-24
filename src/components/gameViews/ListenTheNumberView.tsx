/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AnswerButton from '@/components/game/AnswerButton'
import GameLayout from '@/components/game/GameLayout'
import TalkingTitle from '@/components/TalkingTitle'
import { useListenTheNumberStore } from '@/lib/ListenTheNumberGame/useListenTheNumberStore'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

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
        className="grid h-full grid-rows-[1fr_auto] items-center gap-8 "
      >
        <TalkingTitle text={game.questionText} />
        <motion.div
          className="grid w-full max-w-screen-lg grid-cols-4 gap-4
          justify-self-center"
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
