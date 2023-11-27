import EndGame from './EndGameView'
import ProgressBar from '../ProgressBar'

type Props = {
  children: React.ReactNode
  endGame: boolean
  points: number
  round: number
  maxRound?: number
  restart: () => void
}

export default function GameLayout({
  children,
  endGame,
  points,
  round,
  maxRound = 10,
  restart,
}: Props) {
  const progress = round === 1 ? 0 : ((round - 1) / maxRound) * 100
  return (
    <div className="container grid h-full grid-rows-[auto_1fr] gap-8">
      <ProgressBar value={progress} />
      {!endGame ? children : <EndGame onClick={restart} points={points} />}
    </div>
  )
}
