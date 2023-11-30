/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import FadeInImage from '@/components/FadeInImage'
import TalkingTitle from '@/components/TalkingTitle'
import AnswerButton from '@/components/game/AnswerButton'
import GameLayout from '@/components/game/GameLayout'
import { useEnglishQuizStore } from '@/lib/EnglishQuiz/useEnglishQuizStore'
import useGameController from '@/lib/useGameController'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { Game, EnglishGameData, EnglishWord } from '@prisma/client'
import { motion } from 'framer-motion'

type Props = {
  data: Game & {
    englishGameData: (EnglishGameData & { data: EnglishWord[] }) | null
  }
}

export default function EnglishQuizView({ data: { englishGameData } }: Props) {
  const { game, points, nextRound, restart, setData } = useEnglishQuizStore()
  const { round, nextGameRound, endGame, resetSession } = useGameSessionStore()
  const { handleClick, restartGame } = useGameController({
    init: () => englishGameData?.data && setData(englishGameData.data),
    restart,
    resetSession,
    nextGameRound,
    nextRound,
  })

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
        <TalkingTitle text={game.questionWord.name} language="en-US" />
        <motion.div
          className="grid w-full max-w-screen-lg grid-cols-3 gap-4 justify-self-center pb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {game.answers.map((answer) => (
            <AnswerButton
              key={answer.id}
              type="image"
              isGoodAnswer={answer === game.questionWord}
              handleClick={() => handleClick(answer.id)}
            >
              <FadeInImage
                src={answer.image}
                alt={answer.name}
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
