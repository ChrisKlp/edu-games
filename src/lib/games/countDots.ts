import { Resolver } from 'dns/promises'
import { getRandomArbitrary, shuffleArray } from '../utils'

export default function countDotsGame() {
  const dices: number[] = []
  const questionNumber = getRandomArbitrary(1, 12)
  const answersSet = new Set<number>()
  answersSet.add(questionNumber)

  while (answersSet.size < 4) {
    answersSet.add(getRandomArbitrary(1, 12))
  }

  const answers = shuffleArray(Array.from(answersSet))

  if (questionNumber > 6) {
    dices.push(6)
    dices.push(questionNumber - 6)
  } else {
    dices.push(questionNumber)
  }

  return {
    questionNumber,
    answers,
    dices,
  }
}
