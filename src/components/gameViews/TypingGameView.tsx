/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import saveGameAction from '@/lib/actions/saveGameAction'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { cn } from '@/lib/utils'
import { TypingGame } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { Atma } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import SpeakerButton from '../SpeakerButton'
import GameLayout from '../game/GameLayout'

type Props = {
  data: TypingGame
  startRound?: number
}

const atma = Atma({ weight: ['400', '700'], subsets: ['latin'] })

export default function TypingGameView({ data, startRound = 1 }: Props) {
  const { data: session } = useSession()
  const [inputValue, setInputValue] = useState('')
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const value = data.value as string[]

  const {
    round,
    nextGameRound,
    prevGameRound,
    endGame,
    resetSession,
    setMaxRounds,
    setStartRound,
  } = useGameSessionStore()

  useEffect(() => {
    setMaxRounds(value.length)
    setStartRound(startRound)
    resetSession()
    return () => {
      handleRestartGame()
    }
  }, [])

  const currentString = value[round - 1]

  const handleRestartGame = () => {
    setStartRound(1)
    resetSession()
  }

  const handleSaveGame = () => {
    if (session?.user.id) {
      const gameId = data.id
      const userId = session.user.id
      startTransition(async () => {
        const result = await saveGameAction(
          userId,
          gameId,
          round.toString(),
          pathname,
        )
        if (result?.error) {
          toast.error(result.error)
        } else {
          toast.success('Gra zapisana')
        }
      })
    }
  }

  const handlePrevClick = () => {
    const prevRound = round > 1 ? round - 1 : 1
    const nextText = value[prevRound - 1]
    console.log(nextText)
    setInputValue(nextText)
    prevGameRound()
  }

  const handleNextClick = () => {
    nextGameRound()
    setInputValue('')
  }

  return (
    <GameLayout
      endGame={endGame}
      points={round}
      round={round}
      restart={handleRestartGame}
      saveGame={handleSaveGame}
      maxRound={value.length}
      gameMenu={Boolean(session?.user.id)}
    >
      <div key={round} className="grid h-full grid-rows-[1fr_auto] gap-8">
        <div
          className={cn(
            atma.className,
            'grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-4',
          )}
        >
          <div className="pl-4">
            {currentString.split('').map((item, index) => (
              <span
                key={`${item}-${index}`}
                className={cn(
                  'text-4xl font-bold text-pink-800',
                  inputValue.length - 1 >= index && item !== inputValue[index]
                    ? 'bg-red-500/50'
                    : '',
                )}
              >
                {item}
              </span>
            ))}
          </div>
          <SpeakerButton text={currentString} className="btn-primary" />
          <div className="w-full rounded-xl border-b-2 bg-white p-4">
            <textarea
              value={inputValue}
              rows={3}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              className="w-full text-4xl font-bold text-sky-800 outline-none"
            />
          </div>
          <SpeakerButton text={inputValue} className="btn-primary" />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={cn(
              'btn btn-primary btn-lg',
              round <= 1 && 'btn-disabled',
            )}
            onClick={handlePrevClick}
          >
            <FaArrowLeftLong />
          </button>
          <p>{`${round} / ${value.length}`}</p>
          <button
            className={cn(
              'btn btn-primary btn-lg',
              currentString.trim() !== inputValue.trim() && 'btn-disabled',
            )}
            onClick={handleNextClick}
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </GameLayout>
  )
}
