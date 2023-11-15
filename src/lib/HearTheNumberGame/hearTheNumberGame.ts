import { getRandomArbitrary, shuffleArray } from '../utils'

const config = {
  MIN: 0,
  MAX: 12,
}

enum Numbers {
  'zero',
  'jeden',
  'dwa',
  'trzy',
  'cztery',
  'pięć',
  'sześć',
  'siedem',
  'osiem',
  'dziewięć',
  'dziesięć',
  'jedenaście',
  'dwanaście',
}

export type THearTheNumberGame = {
  questionNumber: number
  questionText: string
  answers: number[]
}

export default function hearTheNumberGame() {
  const questionNumber = getRandomArbitrary(config.MIN, config.MAX)
  const questionText = Numbers[questionNumber]
  const answersSet = new Set<number>()
  answersSet.add(questionNumber)

  while (answersSet.size < 8) {
    answersSet.add(getRandomArbitrary(config.MIN, config.MAX))
  }

  const answers = shuffleArray(Array.from(answersSet))

  return {
    questionNumber,
    questionText,
    answers,
  }
}
