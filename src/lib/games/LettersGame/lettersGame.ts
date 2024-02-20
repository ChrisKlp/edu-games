import { PolishWord } from '@prisma/client'
import { getRandomArbitrary, shuffleArray } from '../../utils'

export type TLettersGame = {
  questionNumber: number
  questionWord?: PolishWord
  letters: string[]
  data: PolishWord[]
}

const availableLetters = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż'

export default function lettersGame(gameData: PolishWord[]) {
  const questionNumber = getRandomArbitrary(0, gameData.length - 1)
  const questionWord = gameData[questionNumber]

  const letters = questionWord ? shuffleArray(questionWord.name.split('')) : []

  return {
    data: gameData,
    questionNumber,
    questionWord,
    letters,
  }
}
