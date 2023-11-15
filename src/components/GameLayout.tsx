import EndGame from './EndGameView'
import ProgressBar from './ProgressBar'

type Props = {
  children: React.ReactNode
  endGame: boolean
  points: number
  progress: number
  restart: () => void
}

export default function GameLayout({
  children,
  endGame,
  points,
  progress,
  restart,
}: Props) {
  return (
    <div className="container grid h-full grid-rows-[auto_1fr] gap-8">
      <ProgressBar value={progress} />
      {!endGame ? children : <EndGame onClick={restart} points={points} />}
    </div>
  )
}
