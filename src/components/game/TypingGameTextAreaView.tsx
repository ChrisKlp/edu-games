'use client'

import { cn } from '@/lib/utils'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import SpeakerButton from '../SpeakerButton'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
  round: number
  maxRounds: number
  currentString?: string
  handlePrevClick: () => string
  handleNextClick: () => void
}

export default function TypingGameTextAreaView({
  round,
  maxRounds,
  currentString,
  handlePrevClick,
  handleNextClick,
}: Props) {
  const [inputValue, setInputValue] = useState('')

  const handlePrevButtonClick = () => {
    const prevText = handlePrevClick()
    setInputValue(prevText)
  }

  const handleNextButtonClick = () => {
    handleNextClick()
    setInputValue('')
  }

  return (
    <div className="grid h-full grid-rows-[1fr_auto] gap-8">
      <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-4 font-serif">
        <div className="pl-4">
          {currentString?.split('').map((item, index) => (
            <span
              key={`${item}-${index}`}
              className={cn(
                'text-4xl font-bold text-pink-800',
                inputValue.length - 1 >= index && item !== inputValue[index]
                  ? 'bg-red-500/50'
                  : '',
              )}
            >
              {item}
            </span>
          ))}
        </div>
        {currentString && (
          <SpeakerButton text={currentString} className="btn-primary" />
        )}
        <div className="w-full rounded-xl border-b-2 bg-white p-4">
          <textarea
            value={inputValue}
            rows={3}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            className="h-full w-full text-4xl font-bold text-sky-800 outline-none"
          />
        </div>
        <SpeakerButton text={inputValue} className="btn-primary" />
      </div>
      <div className="flex items-center justify-between">
        <button
          className={cn('btn btn-primary btn-lg', round <= 1 && 'btn-disabled')}
          onClick={handlePrevButtonClick}
        >
          <FaArrowLeftLong />
        </button>
        <p>{`${round} / ${maxRounds}`}</p>
        <button
          className={cn(
            'btn btn-primary btn-lg',
            currentString?.trim() !== inputValue.trim() && 'btn-disabled',
          )}
          onClick={handleNextButtonClick}
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}
