/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Pokemon from '@/components/Pokemon'
import { cn } from '@/lib/utils'
import SpeakerButton from '../SpeakerButton'
import { useEffect, useRef, useTransition } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import handleEndGameAction from '@/lib/actions/handleEndGameAction'
import toast from 'react-hot-toast'

type Props = {
  gameId: string
  points: number
  typingGameData?: string[]
  onClick: () => void
}

export default function EndGameView({
  gameId,
  points,
  typingGameData,
  onClick,
}: Props) {
  const firstRender = useRef(true)
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const handleEndGame = () => {
    if (session?.user.id) {
      const userId = session.user.id
      startTransition(async () => {
        const result = await handleEndGameAction(userId, gameId, pathname)
        if (result?.error) {
          toast.error(result.error)
        }
      })
    }
  }

  useEffect(() => {
    if (firstRender.current) {
      handleEndGame()
    }
    return () => {
      firstRender.current = false
    }
  }, [])

  return (
    <div className="grid place-items-center gap-4 self-start">
      <p className="text-xl font-bold ">Zdobyte punkty:</p>
      <p className="text-3xl font-bold text-lime-600">{`${points}`}</p>
      <button
        className="rounded-lg bg-pink-700 p-4 px-12 font-bold text-white"
        onClick={onClick}
      >
        Restart
      </button>

      {typingGameData && (
        <div className="mt-4 grid justify-items-center gap-4">
          <div className="grid justify-items-center font-serif text-xl font-bold">
            {typingGameData.map((line, i) => (
              <span className={cn(line === '' && 'p-2')} key={`${line}-${i}`}>
                {line}
              </span>
            ))}
          </div>
          <SpeakerButton
            text={typingGameData.join('\n')}
            className="btn-primary"
          />
        </div>
      )}

      {points > 6 ? <Pokemon /> : <p className="pt-6 text-8xl">😕</p>}
    </div>
  )
}
