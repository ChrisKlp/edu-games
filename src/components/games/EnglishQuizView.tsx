/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEnglishQuizStore } from '@/lib/EnglishQuiz/useEnglishQuizStore'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import AnswerButton from '../AnswerButton'
import FadeInImage from '../FadeInImage'
import GameLayout from '../GameLayout'
import TalkingTitle from '../TalkingTitle'

type Props = {
  color: string
}

export default function EnglishQuizView({ color = 'yellow' }: Props) {
  const { game, points, nextRound, restart, loadData } = useEnglishQuizStore()
  const { round, nextGameRound, endGame, resetSession } = useGameSessionStore()

  function restartGame() {
    restart()
    resetSession()
  }

  useEffect(() => {
    loadData(color)
    restartGame()
  }, [])

  const handleClick = (name: string) => {
    nextRound(name)
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
        <TalkingTitle text={game.questionText} language="en-US" />
        <motion.div
          className="grid grid-cols-3 gap-4 pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {game.answers.map((answer) => (
            <AnswerButton
              key={answer}
              type="image"
              isGoodAnswer={answer === game.questionText}
              handleClick={() => handleClick(answer)}
            >
              <FadeInImage
                src={`/english/${color}/${answer}.jpg`}
                alt={answer}
                width={150}
                height={150}
              />
            </AnswerButton>
          ))}
        </motion.div>
      </div>
    </GameLayout>
  )
}
