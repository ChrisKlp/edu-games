import { MathGameConfig } from '@/types'
import { getRandomArbitrary, shuffleArray } from './utils'

export function generateNumAnswers(
  questionNumber: number,
  length: number,
  min: number,
  max: number,
) {
  const answersSet = new Set<number>()
  answersSet.add(questionNumber)

  while (answersSet.size < length) {
    answersSet.add(getRandomArbitrary(min, max))
  }

  return answersSet
}

export function splitNumberToArr(num: number, config: MathGameConfig) {
  let resultArr: number[] = []

  let rest = num

  while (rest > 0) {
    const maxNumber =
      rest > config.MAX_ONE_NUMBER ? config.MAX_ONE_NUMBER : rest

    let randomNum = getRandomArbitrary(config.MIN, maxNumber)

    if (
      config.MIN_NUMBERS > 1 &&
      resultArr.length === 0 &&
      randomNum === rest &&
      rest > 1
    ) {
      continue
    }

    randomNum = randomNum > rest ? rest : randomNum
    resultArr.push(randomNum)
    rest = rest - randomNum
  }

  while (resultArr.length > config.MAX_NUMBERS) {
    const sortedArray = resultArr.sort()
    const firstElement = sortedArray.shift()

    if (firstElement) {
      const sum = sortedArray[0] + firstElement

      if (sum <= config.MAX_ONE_NUMBER) {
        sortedArray[0] += firstElement
      } else {
        sortedArray.push(sum - config.MAX_ONE_NUMBER)
        sortedArray[0] = config.MAX_ONE_NUMBER
      }
    }

    resultArr = sortedArray
  }

  return shuffleArray(resultArr)
}
