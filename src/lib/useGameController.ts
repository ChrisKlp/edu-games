/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

type TGameController = {
  init?: () => void
  restart: () => void
  resetSession: () => void
  nextRound: (item: any) => void
  nextGameRound: () => void
}

export default function useGameController({
  init,
  restart,
  resetSession,
  nextRound,
  nextGameRound,
}: TGameController) {
  function restartGame() {
    restart()
    resetSession()
  }

  useEffect(() => {
    if (init) init()
    restartGame()
    return () => {
      resetSession()
    }
  }, [])

  const handleClick = (item: number | string) => {
    nextRound(item)
    nextGameRound()
  }

  return {
    restartGame,
    handleClick,
  }
}
