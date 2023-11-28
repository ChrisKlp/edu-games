import Pokemon from '@/components/Pokemon'
import { cn } from '@/lib/utils'
import SpeakerButton from '../SpeakerButton'

type Props = {
  points: number
  typingGameValue?: string[]
  onClick: () => void
}

export default function EndGame({ onClick, points, typingGameValue }: Props) {
  return (
    <div className="grid place-items-center gap-4 self-start">
      <p className="text-xl font-bold ">Twoje punkty:</p>
      <p className="text-3xl font-bold text-lime-600">{`${points}`}</p>
      <button
        className="rounded-lg bg-pink-700 p-4 px-12 font-bold text-white"
        onClick={onClick}
      >
        Restart
      </button>
      {typingGameValue && (
        <div className="mt-4 grid justify-items-center gap-4">
          <div className="grid justify-items-center font-serif text-xl font-bold">
            {typingGameValue.map((line, i) => (
              <span className={cn(line === '' && 'p-2')} key={`${line}-${i}`}>
                {line}
              </span>
            ))}
          </div>
          <SpeakerButton
            text={typingGameValue.join('\n')}
            className="btn-primary"
          />
        </div>
      )}
      {points > 6 ? <Pokemon /> : <p className="pt-6 text-8xl">😕</p>}
    </div>
  )
}
