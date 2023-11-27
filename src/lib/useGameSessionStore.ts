import { create } from 'zustand'

type GameSessionStore = {
  round: number
  startRound: number
  maxRounds: number
  endGame: boolean
  nextGameRound: () => void
  prevGameRound: () => void
  resetSession: () => void
  setMaxRounds: (maxRounds: number) => void
  setStartRound: (startRound: number) => void
}

export const useGameSessionStore = create<GameSessionStore>((set, get) => ({
  round: 1,
  startRound: 1,
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
    const startRound = get().startRound
    return set({
      round: startRound,
      endGame: false,
    })
  },
  setMaxRounds: (maxRounds) => {
    set({ maxRounds })
  },
  setStartRound: (startRound) => {
    set({ startRound })
  },
}))
