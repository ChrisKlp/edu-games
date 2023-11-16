import { create } from 'zustand'
import listenTheNumberGame, {
  TListenTheNumberGame,
} from './listenTheNumberGame'

type ListenTheNumberStore = {
  game: TListenTheNumberGame
  points: number
  round: number
  endGame: boolean
  nextRound: (point: number) => void
  restart: () => void
}

export const useListenTheNumberStore = create<ListenTheNumberStore>((set) => ({
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
      game: listenTheNumberGame(),
      points: state.points + (point === state.game.questionNumber ? 1 : 0),
      round: state.round + 1,
      endGame: state.round < 9 ? false : true,
    })),
  restart: () =>
    set({ game: listenTheNumberGame(), points: 0, round: 1, endGame: false }),
}))
