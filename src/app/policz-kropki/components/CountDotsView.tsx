'use client'

import Button from '@/components/Button'
import { useCountDotsStore } from '@/lib/countDotsGame/useCountDotsStore'
import { cn, getArray } from '@/lib/utils'
import { motion, stagger, useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import Dice from './Dice'
import Pokemon from '@/components/Pokemon'

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
  const { game, points, restart, round, nextRound } = useCountDotsStore()

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

  const handleClick = (item: number) => {
    nextRound(item)
  }

  return (
    <div className="container grid h-full grid-rows-[auto_1fr_auto] items-start gap-8">
      <div className="flex w-full max-w-md justify-between place-self-center">
        {getArray(10).map((i) => (
          <div
            key={i}
            className={cn(
              'h-5 w-5 flex-shrink-0 rounded-full',
              points[i]
                ? 'bg-lime-600'
                : points.length > i
                ? 'bg-red-800'
                : 'bg-slate-200',
            )}
          />
        ))}
      </div>
      {round < 11 ? (
        <>
          <div
            ref={diceScope}
            className="align-items-start flex flex-wrap justify-center gap-8"
          >
            {game.dices.map((dice, i) => (
              <motion.div
                key={Math.random()}
                initial={{ opacity: 0, scale: 0.75 }}
              >
                <Dice number={dice} />
              </motion.div>
            ))}
          </div>
          <div ref={buttonScope} className="grid grid-cols-2 gap-4">
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
      ) : (
        <div className="grid place-items-center gap-4">
          <h2 className="mb-8 text-5xl font-bold text-sky-600">Koniec gry</h2>
          <p className="text-xl font-bold ">Twoje punkty:</p>
          <p className="text-3xl font-bold text-lime-600">
            {`${points.filter((i) => Boolean(i)).length}/10`}
          </p>
          <button
            className="rounded-lg bg-pink-700 p-4 px-12 font-bold text-white"
            onClick={() => {
              restart()
            }}
          >
            Restart
          </button>
          <Pokemon />
        </div>
      )}
    </div>
  )
}
