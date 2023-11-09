'use client'

import Button from '@/components/Button'
import countDotsGame from '@/lib/games/countDots'
import { useRouter } from 'next/navigation'
import Dice from './Dice'

type Props = {
  game?: {
    questionNumber: number
    answers: number[]
    dices: number[]
  }
}

export default function CountDotsView({}: Props) {
  const game = countDotsGame()
  const router = useRouter()

  const handleClick = (item: string | number) => {
    router.refresh()
  }

  return (
    <>
      <div className="container flex flex-wrap justify-center gap-8 pt-10">
        {game.dices.map((dice) => (
          <Dice key={dice} number={dice} />
        ))}
      </div>
      <div className="container grid grid-cols-2 gap-4">
        {game.answers.map((answer) => (
          <Button
            key={answer}
            isAnswer={answer === game.questionNumber}
            handleClick={() => handleClick(answer)}
          >
            {answer}
          </Button>
        ))}
      </div>
    </>
  )
}
