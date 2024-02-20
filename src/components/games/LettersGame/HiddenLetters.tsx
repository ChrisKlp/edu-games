'use client'

import { useEffect, useRef } from 'react'
import { Letter } from './LettersGameView'
import LetterButton from './LetterButton'

type Props = {
  letters: (Letter | null)[]
  hiddenWord: string
  handleRemoveLetter: (index: number) => void
}

export default function HiddenLetters({
  letters,
  hiddenWord,
  handleRemoveLetter,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleHiddenLetterSize = () => {
      if (ref.current && letters.length) {
        ref.current.style.transform = ''
        ref.current.style.left = ''

        const safeMargin = 32
        // @ts-ignore
        let parentWidth = ref.current.parentNode?.offsetWidth
        const scale = parentWidth / ref.current.offsetWidth

        if (scale < 1) {
          ref.current.style.transform = `scale(${scale}) translateX(0)`
          ref.current.style.left = '0'
          const { left } = ref.current.getBoundingClientRect()
          ref.current.style.left = `-${left - safeMargin / 2}px`
        }
        // @ts-ignore
        ref.current.parentNode.style.overflow = 'unset'
      }
    }
    window.addEventListener('resize', handleHiddenLetterSize)
    window.addEventListener('orientationchange', handleHiddenLetterSize)
    handleHiddenLetterSize()
    return () => {
      window.removeEventListener('resize', handleHiddenLetterSize)
      window.removeEventListener('orientationchange', handleHiddenLetterSize)
    }
  }, [letters.length, ref])

  return (
    <div className="relative h-[104px] w-full overflow-hidden">
      <div
        ref={ref}
        className="absolute left-1/2 top-0 flex -translate-x-1/2 justify-center gap-2"
      >
        {letters.map((letter, index) => (
          <LetterButton
            key={`${letter}-${index}`}
            letter={hiddenWord[index]}
            selectedLetter={letter?.value || null}
            onClick={() => handleRemoveLetter(index)}
          />
        ))}
      </div>
    </div>
  )
}
