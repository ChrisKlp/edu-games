import { EnglishWord } from '@prisma/client'
import { generateNumAnswers } from '../../gameUtils'
import { getRandomArbitrary, shuffleArray } from '../../utils'

export type TEnglishQuiz = {
  questionNumber: number
  questionWord: EnglishWord
  answers: EnglishWord[]
  data: EnglishWord[]
}

export default function englishQuiz(quizData: EnglishWord[]) {
  const questionNumber = getRandomArbitrary(0, quizData.length - 1)
  const questionWord = quizData[questionNumber]

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
    questionWord,
    answers,
  }
}
