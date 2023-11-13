'use client'

import Button from '@/components/Button'
import countDotsGame from '@/lib/games/countDots'
import { motion, stagger, useAnimate } from 'framer-motion'
import { useEffect, useState } from 'react'
import Dice from './Dice'

type Props = {
  game?: {
    questionNumber: number
    answers: number[]
    dices: number[]
  }
}

export default function CountDotsView({}: Props) {
  const [diceScope, animateDices] = useAnimate()
  const [buttonScope, animateButtons] = useAnimate()
  const [game, setGame] = useState(countDotsGame())

  useEffect(() => {
    if (diceScope.current) {
      animateDices(
        'div',
        { opacity: 1, scale: 1 },
        { delay: stagger(0.1), type: 'spring', duration: 0.3 },
      )
    }
    if (buttonScope.current) {
      animateButtons(
        'div',
        { opacity: 1, y: 0 },
        { delay: stagger(0.1), type: 'spring', duration: 0.3 },
      )
    }
  }, [animateButtons, animateDices, buttonScope, diceScope, game])

  const handleClick = (item: string | number) => {
    setGame(countDotsGame())
  }

  return (
    <>
      <div
        ref={diceScope}
        className="align-items-start container flex flex-wrap justify-center gap-8"
      >
        {game.dices.map((dice, i) => (
          <motion.div key={Math.random()} initial={{ opacity: 0, scale: 0.75 }}>
            <Dice number={dice} />
          </motion.div>
        ))}
      </div>
      <div ref={buttonScope} className="container grid grid-cols-2 gap-4">
        {game.answers.map((answer) => (
          <motion.div key={Math.random()} initial={{ opacity: 0, y: 5 }}>
            <Button
              isGoodAnswer={answer === game.questionNumber}
              handleClick={() => handleClick(answer)}
            >
              {answer}
            </Button>
          </motion.div>
        ))}
      </div>
    </>
  )
}
