import NoSSRWrapper from '@/components/NoSSRWrapper'
import Pokemon from '@/components/Pokemon'

type Props = {
  points: number
  onClick: () => void
}

export default function EndGame({ onClick, points }: Props) {
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
      {points > 6 ? <Pokemon /> : <p className="pt-6 text-8xl">😕</p>}
    </div>
  )
}
