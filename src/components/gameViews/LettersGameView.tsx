'use client'

import GameLayout from '@/components/game/GameLayout'
import { useLettersGameStore } from '@/lib/LettersGame/useLettersGameStore'
import useGameController from '@/lib/useGameController'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { cn } from '@/lib/utils'
import { Game, LettersGameData, PolishWord } from '@prisma/client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import TalkingFadeInImage from '../TalkingFadeInImage'
import LetterButton from '../game/LetterButton'

type Props = {
  data: Game & {
    lettersGameData: (LettersGameData & { data: PolishWord[] }) | null
  }
}

type Letter = {
  value: string
  index: number
  isSelected: boolean
}

export default function LettersGameView({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { game, points, nextRound, restart, setData } = useLettersGameStore()
  const { round, nextGameRound, endGame, resetSession, setMaxRounds } =
    useGameSessionStore()
  const { handleClick, restartGame } = useGameController({
    init: () => {
      data.lettersGameData?.data && setData(data.lettersGameData.data)
      setMaxRounds(10)
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
    if (game.questionWord.name) {
      setHiddenLetters(game.questionWord.name.split('').map((i) => null))
      setLetters(
        game.letters.map((l, i) => ({ value: l, index: i, isSelected: false })),
      )
    }
  }, [game.questionWord, game.letters])

  useEffect(() => {
    const handleHiddenLetterSize = () => {
      if (ref.current && hiddenLetters.length) {
        ref.current.style.transform = ''
        ref.current.style.left = ''

        const safeMargin = 32
        // @ts-ignore
        let parentWidth = ref.current.parentNode?.offsetWidth
        const scale = parentWidth / ref.current.offsetWidth

        if (scale < 1) {
          ref.current.style.transform = `scale(${scale}) translateX(0)`
          ref.current.style.left = '0'
          const { left } = ref.current.getBoundingClientRect()
          ref.current.style.left = `-${left - safeMargin / 2}px`
          // @ts-ignore
          ref.current.parentNode.style.overflow = 'unset'
        }
      }
    }
    window.addEventListener('resize', handleHiddenLetterSize)
    window.addEventListener('orientationchange', handleHiddenLetterSize)
    handleHiddenLetterSize()
    return () => {
      window.removeEventListener('resize', handleHiddenLetterSize)
      window.removeEventListener('orientationchange', handleHiddenLetterSize)
    }
  }, [hiddenLetters.length, ref])

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
        className="grid h-full grid-rows-[1fr_auto] items-start gap-8"
      >
        <div className="grid justify-items-center gap-8">
          {game.questionWord.image && (
            <TalkingFadeInImage
              src={game.questionWord.image}
              text={game.questionWord.name}
            />
          )}
          <div className="relative h-[104px] w-full overflow-hidden">
            <div
              ref={ref}
              className="absolute left-1/2 top-0 flex -translate-x-1/2 justify-center gap-2"
            >
              {hiddenLetters.map((letter, index) => (
                <LetterButton
                  key={`${letter}-${index}`}
                  letter={game.questionWord.name[index]}
                  selectedLetter={letter?.value || null}
                  onClick={() => handleRemoveLetter(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <motion.div
          className="flex w-full flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {letters &&
            letters.map((letter) => (
              <button
                type="button"
                key={`${letter}-${letter.index}`}
                className={cn(
                  'w-full max-w-[40px] rounded-lg bg-white p-2 py-3 text-xl font-semibold capitalize drop-shadow-xl',
                  letter.isSelected && 'opacity-25',
                )}
                onClick={() => handleAddLetter(letter)}
                disabled={letter.isSelected}
              >
                {letter.value}
              </button>
            ))}
        </motion.div>
      </div>
    </GameLayout>
  )
}
