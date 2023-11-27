/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

type TGameController = {
  init?: () => void
  restart?: () => void
  resetSession?: () => void
  nextRound?: (item: any) => void
  nextGameRound?: () => void
}

export default function useGameController({
  init,
  restart,
  resetSession,
  nextRound,
  nextGameRound,
}: TGameController) {
  function restartGame() {
    if (restart) restart()
    if (resetSession) resetSession()
  }

  useEffect(() => {
    if (init) init()
    restartGame()
    return () => {
      if (resetSession) resetSession()
    }
  }, [])

  const handleClick = (item: number | string) => {
    if (nextRound) nextRound(item)
    if (nextGameRound) nextGameRound()
  }

  return {
    restartGame,
    handleClick,
  }
}
