import { create } from 'zustand'

type GameSessionStore = {
  round: number
  endGame: boolean
  nextGameRound: () => void
  resetSession: () => void
}

export const useGameSessionStore = create<GameSessionStore>((set) => ({
  round: 1,
  endGame: false,
  nextGameRound: () => {
    return set((state) => ({
      round: state.round + 1,
      endGame: state.round < 10 ? false : true,
    }))
  },
  resetSession: () => {
    return set({
      round: 1,
      endGame: false,
    })
  },
}))
