import { create } from 'zustand'
import englishQuiz, { TEnglishQuiz } from './englishQuiz'
import data from './data'

type EnglishQuizStore = {
  game: TEnglishQuiz
  points: number
  color: string
  loadData: (color: string) => void
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
  color: 'yellow',
  loadData: (color) =>
    set((state) => ({
      color,
      game: {
        ...state.game,
        data: data[color],
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
