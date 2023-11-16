import { create } from 'zustand'
import additionTo12Game, { TAdditionTo12Game } from './additionTo12Game'
import { Level } from '@/types'

type AdditionTo12Store = {
  game: TAdditionTo12Game
  points: number
  round: number
  endGame: boolean
  level: Level
  setLevel: (level: Level) => void
  nextRound: (point: number) => void
  restart: () => void
}

export const useAdditionTo12Store = create<AdditionTo12Store>((set, get) => ({
  game: {
    answers: [],
    numbers: [],
    questionNumber: 0,
  },
  points: 0,
  round: 1,
  endGame: false,
  level: Level.normal,
  setLevel: (level) => set({ level: level }),
  nextRound: (point) => {
    const level = get().level
    return set((state) => ({
      game: additionTo12Game(level),
      points: state.points + (point === state.game.questionNumber ? 1 : 0),
      round: state.round + 1,
      endGame: state.round < 9 ? false : true,
    }))
  },
  restart: () => {
    const level = get().level
    return set({
      game: additionTo12Game(level),
      points: 0,
      round: 1,
      endGame: false,
    })
  },
}))
