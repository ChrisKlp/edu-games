import EndGame from './EndGameView'
import ProgressBar from '../ProgressBar'
import GameMenu from './GameMenu'

type Props = {
  children: React.ReactNode
  endGame: boolean
  points: number
  round: number
  maxRounds?: number
  gameMenu?: boolean
  typingGameValue?: string[]
  restart: () => void
  saveGame?: () => void
}

export default function GameLayout({
  children,
  endGame,
  points,
  round,
  maxRounds = 10,
  gameMenu = false,
  typingGameValue,
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
        <EndGame
          onClick={restart}
          points={points}
          typingGameValue={typingGameValue}
        />
      )}
    </div>
  )
}
