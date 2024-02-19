import { create } from 'zustand'
import englishQuiz, { TEnglishQuiz } from './englishQuiz'
import { EnglishWord } from '@prisma/client'

type EnglishQuizStore = {
  game: TEnglishQuiz
  points: number
  setData: (data: EnglishWord[]) => void
  nextRound: (id: string) => void
  restart: (data: EnglishWord[]) => void
}

export const useEnglishQuizStore = create<EnglishQuizStore>((set, get) => ({
  game: {
    data: [],
    answers: [],
    questionWord: {
      id: '',
      name: '',
      image: '',
      englishGameDataGameId: '',
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
      game: englishQuiz(updatedData),
      points: state.points + (word?.id === state.game.questionWord.id ? 1 : 0),
    }))
  },
  restart: (data) => {
    return set({
      game: englishQuiz(data),
      points: 0,
    })
  },
}))
