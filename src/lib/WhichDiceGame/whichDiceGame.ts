import { Level, Numbers } from '@/types'
import { nanoid } from 'nanoid'
import { getRandomArbitrary, shuffleArray } from '../utils'
import { generateNumAnswers, splitNumberToArr } from '../gameUtils'

const configs = {
  easy: {
    MIN: 1,
    MAX: 10,
    MAX_ONE_NUMBER: 5,
    MAX_NUMBERS: 2,
    MIN_NUMBERS: 2,
  },
  normal: {
    MIN: 1,
    MAX: 12,
    MAX_ONE_NUMBER: 6,
    MAX_NUMBERS: 2,
    MIN_NUMBERS: 2,
  },
}

export type TWhichDiceGame = {
  questionNumber: number
  questionText: string
  answers: {
    id: string
    answer: number
    numbers: number[]
  }[]
}

export default function whichDiceGame(level: Level = Level.normal) {
  const config = configs[level]
  const questionNumber = getRandomArbitrary(config.MIN + 1, config.MAX)
  const questionText = Numbers[questionNumber]

  const answersSet = generateNumAnswers(
    questionNumber,
    3,
    config.MIN + 1,
    config.MAX,
  )

  const answers = shuffleArray(Array.from(answersSet)).map((answer) => ({
    id: nanoid(10),
    answer,
    numbers: splitNumberToArr(answer, config),
  }))

  return {
    questionNumber,
    questionText,
    answers,
  }
}
