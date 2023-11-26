import { create } from 'zustand'
import englishQuiz, { TEnglishQuiz } from './englishQuiz'

type EnglishQuizStore = {
  game: TEnglishQuiz
  points: number
  setData: (data: string[]) => void
  nextRound: (name: string) => void
  restart: () => void
}

export const useEnglishQuizStore = create<EnglishQuizStore>((set, get) => ({
  game: {
    data: [],
    answers: [],
    questionText: '',
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
  nextRound: (name) => {
    const quizData = get().game.data
    const updatedData = quizData.filter((item) => item !== name)
    return set((state) => ({
      game: englishQuiz(updatedData),
      points: state.points + (name === state.game.questionText ? 1 : 0),
    }))
  },
  restart: () => {
    const quizData = get().game.data
    return set({
      game: englishQuiz(quizData),
      points: 0,
    })
  },
}))
