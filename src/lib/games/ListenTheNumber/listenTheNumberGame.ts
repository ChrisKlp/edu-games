import { Numbers } from '@/types'
import { getRandomArbitrary, shuffleArray } from '../../utils'
import { generateNumAnswers } from '../../gameUtils'

const config = {
  MIN: 0,
  MAX: 12,
}

export type TListenTheNumberGame = {
  questionNumber: number
  questionText: string
  answers: number[]
}

export default function listenTheNumberGame() {
  const questionNumber = getRandomArbitrary(config.MIN, config.MAX)
  const questionText = Numbers[questionNumber]

  const answersSet = generateNumAnswers(
    questionNumber,
    8,
    config.MIN,
    config.MAX,
  )
  const answers = shuffleArray(Array.from(answersSet))

  return {
    questionNumber,
    questionText,
    answers,
  }
}
