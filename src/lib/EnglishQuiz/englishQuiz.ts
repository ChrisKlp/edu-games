import { generateNumAnswers } from '../gameUtils'
import { getRandomArbitrary, shuffleArray } from '../utils'

export type TEnglishQuiz = {
  questionNumber: number
  questionText: string
  answers: string[]
  data: string[]
}

export default function englishQuiz(quizData: string[]) {
  const questionNumber = getRandomArbitrary(0, quizData.length - 1)
  const questionText = quizData[questionNumber]

  const answersSet = generateNumAnswers(
    questionNumber,
    3,
    0,
    quizData.length - 1,
  )

  const answers = shuffleArray(
    Array.from(answersSet).map((answer) => quizData[answer]),
  )

  return {
    data: quizData,
    questionNumber,
    questionText,
    answers,
  }
}
