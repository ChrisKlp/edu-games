/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { cn } from '@/lib/utils'
import { TypingGame } from '@prisma/client'
import { Atma } from 'next/font/google'
import { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import SpeakerButton from '../SpeakerButton'
import GameLayout from '../game/GameLayout'

type Props = {
  data: TypingGame
}

const atma = Atma({ weight: ['400', '700'], subsets: ['latin'] })

export default function TypingGameView({ data }: Props) {
  const [inputValue, setInputValue] = useState('')
  const value = data.value as string[]

  const {
    round,
    nextGameRound,
    prevGameRound,
    endGame,
    resetSession,
    setMaxRounds,
  } = useGameSessionStore()

  useEffect(() => {
    setMaxRounds(value.length)
    resetSession()
    return () => {
      resetSession()
    }
  }, [])

  useEffect(() => {
    setInputValue('')
  }, [round])

  const currentString = value[round - 1]

  return (
    <GameLayout
      endGame={endGame}
      points={round}
      round={round}
      restart={resetSession}
      maxRound={value.length}
    >
      <div
        key={round}
        className="grid h-full grid-rows-[1fr_auto] items-center gap-8"
      >
        <div
          className={cn(
            atma.className,
            'grid grid-cols-[1fr_auto] grid-rows-2 gap-4',
          )}
        >
          <div className="mb-10 pl-4">
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
            onClick={() => prevGameRound()}
          >
            <FaArrowLeftLong />
          </button>
          <p>{`${round} / ${value.length}`}</p>
          <button
            className={cn(
              'btn btn-primary btn-lg',
              currentString !== inputValue && 'btn-disabled',
            )}
            onClick={() => nextGameRound()}
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </GameLayout>
  )
}
