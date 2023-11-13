import { create } from 'zustand'
import countDotsGame, { TCountDotsGame } from './countDots'

type CountDotsStore = {
  game: TCountDotsGame
  round: number
  points: number[]
  nextRound: (point: number) => void
  restart: () => void
}

export const useCountDotsStore = create<CountDotsStore>((set) => ({
  game: countDotsGame(),
  round: 1,
  points: [],
  nextRound: (point) =>
    set((state) => ({
      game: countDotsGame(),
      round: state.round + 1,
      points: [...state.points, point === state.game.questionNumber ? 1 : 0],
    })),
  restart: () => set({ game: countDotsGame(), round: 1, points: [] }),
}))
