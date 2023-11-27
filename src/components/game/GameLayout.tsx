import EndGame from './EndGameView'
import ProgressBar from '../ProgressBar'
import GameMenu from './GameMenu'

type Props = {
  children: React.ReactNode
  endGame: boolean
  points: number
  round: number
  maxRound?: number
  gameMenu?: boolean
  restart: () => void
  saveGame?: () => void
}

export default function GameLayout({
  children,
  endGame,
  points,
  round,
  maxRound = 10,
  gameMenu = false,
  restart,
  saveGame,
}: Props) {
  const progress = round === 1 ? 0 : ((round - 1) / maxRound) * 100
  return (
    <div className="container grid h-full grid-rows-[auto_1fr] gap-8">
      <div className="flex items-center justify-between gap-4">
        <ProgressBar value={progress} />
        {gameMenu && (
          <GameMenu handleRestart={restart} handleSaveGame={saveGame} />
        )}
      </div>
      {!endGame ? children : <EndGame onClick={restart} points={points} />}
    </div>
  )
}
