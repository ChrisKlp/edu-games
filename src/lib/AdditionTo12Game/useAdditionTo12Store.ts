import { create } from 'zustand'
import additionTo12Game, { TAdditionTo12Game } from './additionTo12Game'

type AdditionTo12Store = {
  game: TAdditionTo12Game
  points: number
  round: number
  endGame: boolean
  nextRound: (point: number) => void
  restart: () => void
}

export const useAdditionTo12Store = create<AdditionTo12Store>((set) => ({
  game: {
    answers: [],
    numbers: [],
    questionNumber: 0,
  },
  points: 0,
  round: 1,
  endGame: false,
  nextRound: (point) =>
    set((state) => ({
      game: additionTo12Game(),
      points: state.points + (point === state.game.questionNumber ? 1 : 0),
      round: state.round + 1,
      endGame: state.round < 9 ? false : true,
    })),
  restart: () =>
    set({ game: additionTo12Game(), points: 0, round: 1, endGame: false }),
}))
