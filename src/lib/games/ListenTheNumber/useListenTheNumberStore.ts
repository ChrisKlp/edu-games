import { create } from 'zustand'
import listenTheNumberGame, {
  TListenTheNumberGame,
} from './listenTheNumberGame'

type ListenTheNumberStore = {
  game: TListenTheNumberGame
  points: number
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
  nextRound: (point) =>
    set((state) => ({
      game: listenTheNumberGame(),
      points: state.points + (point === state.game.questionNumber ? 1 : 0),
    })),
  restart: () => set({ game: listenTheNumberGame(), points: 0 }),
}))
