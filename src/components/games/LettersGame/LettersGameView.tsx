'use client'

import GameLayout from '@/components/games/GameLayout'
import { useLettersGameStore } from '@/lib/games/LettersGame/useLettersGameStore'
import useGameController from '@/lib/useGameController'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { cn } from '@/lib/utils'
import { Game, LettersGameData, PolishWord } from '@prisma/client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TalkingFadeInImage from '@/components/TalkingFadeInImage'
import HiddenLetters from '@/components/games/LettersGame/HiddenLetters'
import { TbSquareRoundedChevronRightFilled } from 'react-icons/tb'

type Props = {
  data: Game & {
    lettersGameData: (LettersGameData & { data: PolishWord[] }) | null
  }
}

export type Letter = {
  value: string
  index: number
  isSelected: boolean
}

export default function LettersGameView({ data }: Props) {
  const { game, points, nextRound, restart, setData } = useLettersGameStore()
  const {
    round,
    nextGameRound,
    endGame,
    resetSession,
    setMaxRounds,
    maxRounds,
  } = useGameSessionStore()
  const { handleClick, restartGame } = useGameController({
    init: () => {
      if (data.lettersGameData?.data.length) {
        setData(data.lettersGameData.data)
        setMaxRounds(
          data.lettersGameData.data.length > 10
            ? 10
            : data.lettersGameData.data.length,
        )
      }
    },
    restart: () => {
      data.lettersGameData?.data && restart(data.lettersGameData.data)
    },
    resetSession,
    nextGameRound,
    nextRound,
  })

  const [hiddenLetters, setHiddenLetters] = useState<(Letter | null)[]>([])
  const [letters, setLetters] = useState<Letter[]>([])

  useEffect(() => {
    if (game.questionWord?.name) {
      setHiddenLetters(game.questionWord?.name.split('').map((i) => null))
      setLetters(
        game.letters.map((l, i) => ({ value: l, index: i, isSelected: false })),
      )
    }
  }, [game.questionWord, game.letters])

  const handleAddLetter = (letter: Letter) => {
    const nextHiddenLetters = [...hiddenLetters]
    const firstFreeSpaceIdx = nextHiddenLetters.findIndex((i) => i === null)
    if (firstFreeSpaceIdx > -1) {
      nextHiddenLetters[firstFreeSpaceIdx] = letter
      setHiddenLetters(nextHiddenLetters)
      setLetters((prev) =>
        prev.map((el, i) =>
          i === letter.index ? { ...el, isSelected: true } : el,
        ),
      )
    }
  }

  const handleRemoveLetter = (index: number) => {
    const removedLetter = hiddenLetters[index]
    if (removedLetter !== null) {
      const nextHiddenLetters = [...hiddenLetters]
      nextHiddenLetters[index] = null
      setHiddenLetters(nextHiddenLetters)
      setLetters((prev) =>
        prev.map((el, i) =>
          i === removedLetter.index ? { ...el, isSelected: false } : el,
        ),
      )
    }
  }

  const handleNextRoundClick = () => {
    handleClick(game.questionWord?.id || '')
    setHiddenLetters([])
  }

  const isError =
    hiddenLetters
      .filter((item) => Boolean(item))
      .map((i) => i?.value)
      .join('') !== game.questionWord?.name

  return (
    <GameLayout
      gameId={data.id}
      endGame={endGame}
      points={points}
      round={round}
      maxRounds={maxRounds}
      restart={restartGame}
    >
      <div
        key={round}
        className="grid h-full grid-rows-[1fr_auto] items-start gap-8"
      >
        <div className="grid justify-items-center gap-8 self-center">
          {game.questionWord?.image && (
            <div className="flex w-full items-center justify-between">
              <div className="h-auto w-16" />
              <TalkingFadeInImage
                src={game.questionWord.image}
                text={game.questionWord.name}
              />
              <motion.button
                type="button"
                className={cn(isError ? 'text-slate-300' : 'text-sky-600')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                disabled={isError}
                onClick={handleNextRoundClick}
              >
                <TbSquareRoundedChevronRightFilled className="h-auto w-16" />
              </motion.button>
            </div>
          )}
          <HiddenLetters
            letters={hiddenLetters}
            hiddenWord={game.questionWord?.name || ''}
            handleRemoveLetter={handleRemoveLetter}
          />
        </div>
        {letters && (
          <motion.div
            className="flex w-full flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {letters.map((letter) => (
              <button
                type="button"
                key={`${letter}-${letter.index}`}
                className={cn(
                  'w-full max-w-[48px] rounded-lg bg-white p-2 py-4 text-2xl font-semibold capitalize drop-shadow-xl',
                  letter.isSelected && 'opacity-25',
                )}
                onClick={() => handleAddLetter(letter)}
                disabled={letter.isSelected}
              >
                {letter.value}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </GameLayout>
  )
}
