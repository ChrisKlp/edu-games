import { create } from 'zustand'

type GameSessionStore = {
  round: number
  maxRounds: number
  endGame: boolean
  nextGameRound: () => void
  prevGameRound: () => void
  resetSession: () => void
  setMaxRounds: (maxRounds: number) => void
}

export const useGameSessionStore = create<GameSessionStore>((set) => ({
  round: 1,
  maxRounds: 10,
  endGame: false,
  nextGameRound: () => {
    return set((state) => ({
      round: state.round + 1,
      endGame: state.round < state.maxRounds ? false : true,
    }))
  },
  prevGameRound: () => {
    return set((state) => ({
      round: state.round - 1,
    }))
  },
  resetSession: () => {
    return set({
      round: 1,
      endGame: false,
    })
  },
  setMaxRounds: (maxRounds) => {
    set({ maxRounds })
  },
}))
