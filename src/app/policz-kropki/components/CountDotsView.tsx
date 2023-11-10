'use client'

import Button from '@/components/Button'
import countDotsGame from '@/lib/games/countDots'
import Dice from './Dice'
import { useState } from 'react'
import NoSSRWrapper from '@/components/NoSSRWrapper'

type Props = {
  game?: {
    questionNumber: number
    answers: number[]
    dices: number[]
  }
}

export default function CountDotsView({}: Props) {
  const [game, setGame] = useState(countDotsGame())

  console.log(game.dices)

  const handleClick = (item: string | number) => {
    setGame(countDotsGame())
  }

  return (
    <NoSSRWrapper>
      <div className="container flex flex-wrap justify-center gap-8">
        {game.dices.map((dice, i) => (
          <Dice key={`D${dice}-num${i}`} number={dice} />
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
    </NoSSRWrapper>
  )
}
