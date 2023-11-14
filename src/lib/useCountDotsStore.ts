import { create } from 'zustand'
import countDotsGame, { TCountDotsGame } from './countDotsGame/countDotsGame'

type CountDotsStore = {
  game: TCountDotsGame
  points: number[]
  endGame: boolean
  nextRound: (point: number) => void
  restart: () => void
}

export const useCountDotsStore = create<CountDotsStore>((set) => ({
  game: {
    answers: [],
    dices: [],
    questionNumber: 0,
  },
  points: [],
  endGame: false,
  nextRound: (point) =>
    set((state) => ({
      game: countDotsGame(),
      points: [...state.points, point === state.game.questionNumber ? 1 : 0],
      endGame: state.points.length < 9 ? false : true,
    })),
  restart: () => set({ game: countDotsGame(), points: [], endGame: false }),
}))
