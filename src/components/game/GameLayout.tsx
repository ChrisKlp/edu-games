import ProgressBar from '../ProgressBar'
import EndGameView from './EndGameView'
import GameMenu from './GameMenu'

type Props = {
  children: React.ReactNode
  gameId: string
  endGame: boolean
  points: number
  round: number
  maxRounds?: number
  gameMenu?: boolean
  typingGameData?: string[]
  restart: () => void
  saveGame?: () => void
}

export default function GameLayout({
  children,
  gameId,
  endGame,
  points,
  round,
  maxRounds = 10,
  gameMenu = false,
  typingGameData,
  restart,
  saveGame,
}: Props) {
  const progress = round === 1 ? 0 : ((round - 1) / maxRounds) * 100

  return (
    <div className="container grid h-full grid-rows-[auto_1fr] gap-8">
      <div className="flex items-center justify-between gap-4">
        <ProgressBar value={endGame ? 100 : progress} />
        {gameMenu && (
          <GameMenu handleRestart={restart} handleSaveGame={saveGame} />
        )}
      </div>
      {!endGame ? (
        children
      ) : (
        <EndGameView
          gameId={gameId}
          onClick={restart}
          points={points}
          typingGameData={typingGameData}
        />
      )}
    </div>
  )
}
