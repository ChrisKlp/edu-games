import { create } from 'zustand'
import whichDiceGame, { TWhichDiceGame } from './whichDiceGame'
import { Level } from '@/types'

type WhichDiceGameStore = {
  game: TWhichDiceGame
  points: number
  round: number
  endGame: boolean
  level: Level
  setLevel: (level: Level) => void
  nextRound: (point: number) => void
  restart: () => void
}

export const useWhichDiceStore = create<WhichDiceGameStore>((set, get) => ({
  game: {
    answers: [],
    questionText: '',
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
      game: whichDiceGame(level),
      points: state.points + (point === state.game.questionNumber ? 1 : 0),
      round: state.round + 1,
      endGame: state.round < 9 ? false : true,
    }))
  },
  restart: () => {
    const level = get().level
    return set({
      game: whichDiceGame(level),
      points: 0,
      round: 1,
      endGame: false,
    })
  },
}))
