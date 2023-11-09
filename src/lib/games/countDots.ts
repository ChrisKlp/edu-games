import { getRandomArbitrary, shuffleArray } from '../utils'

export default function countDotsGame() {
  const questionNumber = getRandomArbitrary(1, 6)
  const answersSet = new Set<number>()
  answersSet.add(questionNumber)

  while (answersSet.size < 4) {
    answersSet.add(getRandomArbitrary(1, 6))
  }

  const answers = shuffleArray(Array.from(answersSet))

  return {
    questionNumber,
    answers,
  }
}
