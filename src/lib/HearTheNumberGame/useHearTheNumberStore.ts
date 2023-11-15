import { create } from 'zustand'
import hearTheNumberGame, { THearTheNumberGame } from './hearTheNumberGame'

type HearTheNumberStore = {
  game: THearTheNumberGame
  points: number
  round: number
  endGame: boolean
  nextRound: (point: number) => void
  restart: () => void
}

export const useHearTheNumberStore = create<HearTheNumberStore>((set) => ({
  game: {
    answers: [],
    questionText: '',
    questionNumber: -1,
  },
  points: 0,
  round: 1,
  endGame: false,
  nextRound: (point) =>
    set((state) => ({
      game: hearTheNumberGame(),
      points: state.points + (point === state.game.questionNumber ? 1 : 0),
      round: state.round + 1,
      endGame: state.round < 9 ? false : true,
    })),
  restart: () =>
    set({ game: hearTheNumberGame(), points: 0, round: 1, endGame: false }),
}))
