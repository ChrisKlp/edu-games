import { PolishWord } from '@prisma/client'
import { create } from 'zustand'
import lettersGame, { TLettersGame } from './lettersGame'

type LettersGameStore = {
  game: TLettersGame
  points: number
  setData: (data: PolishWord[]) => void
  nextRound: (id: string) => void
  restart: (data: PolishWord[]) => void
}

export const useLettersGameStore = create<LettersGameStore>((set, get) => ({
  game: {
    data: [],
    letters: [],
    questionWord: {
      id: '',
      name: '',
      image: '',
      lettersGameDataGameId: '',
    },
    questionNumber: 0,
  },
  points: 0,
  setData: (data) =>
    set((state) => ({
      game: {
        ...state.game,
        data,
      },
    })),
  nextRound: (id) => {
    const quizData = get().game.data
    const word = quizData.find((item) => item.id === id)
    const updatedData = quizData.filter((item) => item.id !== id)
    return set((state) => ({
      game: lettersGame(updatedData),
      points: state.points + (word?.id === state.game.questionWord?.id ? 1 : 0),
    }))
  },
  restart: (data) => {
    return set({
      game: lettersGame(data),
      points: 0,
    })
  },
}))
