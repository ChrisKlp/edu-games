import { create } from 'zustand'
import countDotsGame, { TCountDotsGame } from './countDotsGame'

type CountDotsStore = {
  game: TCountDotsGame
  points: number
  round: number
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
  points: 0,
  round: 1,
  endGame: false,
  nextRound: (point) =>
    set((state) => ({
      game: countDotsGame(),
      points: state.points + (point === state.game.questionNumber ? 1 : 0),
      round: state.round + 1,
      endGame: state.round < 9 ? false : true,
    })),
  restart: () =>
    set({ game: countDotsGame(), points: 0, round: 1, endGame: false }),
}))
