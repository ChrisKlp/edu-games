'use client'

import Button from '@/components/Button'
import Dice from './Dice'

type Props = {
  game: {
    questionNumber: number
    answers: number[]
  }
}

export default function CountDotsView({ game }: Props) {
  const handleClick = (item: string | number) => {
    console.log(item)
  }
  return (
    <>
      <div className="container flex flex-wrap justify-center gap-8 pt-10">
        <Dice number={game.questionNumber} />
      </div>
      <div className="container grid grid-cols-2 gap-4">
        {game.answers.map((answer) => (
          <Button key={answer} onClick={() => handleClick(answer)}>
            {answer}
          </Button>
        ))}
      </div>
    </>
  )
}
