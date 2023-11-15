import { getRandomArbitrary, shuffleArray } from '../utils'

const config = {
  MIN: 1,
  MAX: 12,
  MAX_ONE_NUMBER: 6,
  MAX_NUMBERS: 3,
  MIN_NUMBERS: 2,
}

export type TAdditionTo12Game = {
  questionNumber: number
  answers: number[]
  numbers: number[]
}

export default function additionTo12Game() {
  let numbers: number[] = []
  const questionNumber = getRandomArbitrary(config.MIN, config.MAX)
  const answersSet = new Set<number>()
  answersSet.add(questionNumber)

  while (answersSet.size < 4) {
    answersSet.add(getRandomArbitrary(config.MIN, config.MAX))
  }

  const answers = shuffleArray(Array.from(answersSet))

  let rest = questionNumber

  while (rest > 0) {
    let randomNum = getRandomArbitrary(config.MIN, config.MAX_ONE_NUMBER)
    randomNum = randomNum > rest ? rest : randomNum
    numbers.push(randomNum)
    rest = rest - randomNum
  }

  if (numbers.length < config.MIN_NUMBERS) {
    return additionTo12Game()
  }

  while (numbers.length > config.MAX_NUMBERS) {
    const sortedArray = numbers.sort()
    const firstElement = sortedArray.shift()

    if (firstElement && sortedArray[0] + firstElement < 7) {
      sortedArray[0] += firstElement
    }

    numbers = sortedArray
  }

  return {
    questionNumber,
    answers,
    numbers: shuffleArray(numbers),
  }
}
