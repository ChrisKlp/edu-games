import { Level } from '@/types'
import { getRandomArbitrary, shuffleArray } from '../utils'
import { generateNumAnswers, splitNumberToArr } from '../gameUtils'
import { nanoid } from 'nanoid'

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
    MAX_NUMBERS: 3,
    MIN_NUMBERS: 2,
  },
}

export type TAdditionTo12Game = {
  questionNumber: number
  answers: number[]
  numbers: number[]
}

export default function additionTo12Game(level: Level = Level.normal) {
  const config = configs[level]
  const questionNumber = getRandomArbitrary(config.MIN + 1, config.MAX)

  const answersSet = generateNumAnswers(
    questionNumber,
    4,
    config.MIN,
    config.MAX,
  )
  const answers = shuffleArray(Array.from(answersSet))
  const numbers = splitNumberToArr(questionNumber, config)

  return {
    questionNumber,
    answers,
    numbers,
  }
}
