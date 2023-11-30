/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import saveGameAction from '@/lib/actions/saveGameAction'
import { useGameSessionStore } from '@/lib/useGameSessionStore'
import { Game, TypingGameData } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import toast from 'react-hot-toast'
import GameLayout from '../game/GameLayout'
import TypingGameTextAreaView from '../game/TypingGameTextAreaView'

type Props = {
  data: Game & { typingGameData: TypingGameData | null }
  startRound?: number
}

export default function TypingGameView({ data, startRound = 1 }: Props) {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const { typingGameData } = data
  const fullValue = typingGameData?.data
    ? (typingGameData.data as string[])
    : []
  const value = fullValue.filter((i) => Boolean(i))

  const {
    round,
    maxRounds,
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
    const prevText = value[prevRound - 1]
    prevGameRound()
    return prevText
  }

  const handleNextClick = () => {
    nextGameRound()
  }

  return (
    <GameLayout
      endGame={endGame}
      points={round}
      round={round}
      restart={handleRestartGame}
      saveGame={handleSaveGame}
      maxRounds={maxRounds}
      gameMenu={Boolean(session?.user.id)}
      typingGameValue={fullValue}
    >
      <TypingGameTextAreaView
        round={round}
        maxRounds={maxRounds}
        currentString={currentString}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
      />
    </GameLayout>
  )
}
