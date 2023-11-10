import { Resolver } from 'dns/promises'
import { getRandomArbitrary, shuffleArray } from '../utils'

const config = {
  MIN: 1,
  MAX: 12,
  MAX_IN_DICE: 6,
  MAX_DICES: 3,
}

export default function countDotsGame() {
  let dices: number[] = []
  const questionNumber = getRandomArbitrary(config.MIN, config.MAX)
  const answersSet = new Set<number>()
  answersSet.add(questionNumber)

  while (answersSet.size < 4) {
    answersSet.add(getRandomArbitrary(config.MIN, config.MAX))
  }

  const answers = shuffleArray(Array.from(answersSet))

  let rest = questionNumber

  while (rest > 0) {
    let randomNum = getRandomArbitrary(config.MIN, config.MAX_IN_DICE)
    randomNum = randomNum > rest ? rest : randomNum
    dices.push(randomNum)
    rest = rest - randomNum
  }

  while (dices.length > config.MAX_DICES) {
    const sortedArray = dices.sort()
    const firstElement = sortedArray.shift()

    if (firstElement && sortedArray[0] + firstElement < 7) {
      sortedArray[0] += firstElement
    }

    dices = sortedArray
  }

  return {
    questionNumber,
    answers,
    dices: shuffleArray(dices),
  }
}
