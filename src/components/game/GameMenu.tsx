'use client'

import { IoMdRefresh, IoMdSave } from 'react-icons/io'

type Props = {
  handleRestart: () => void
  handleSaveGame?: () => void
}

export default function GameMenu({ handleRestart, handleSaveGame }: Props) {
  return (
    <div className="flex gap-2">
      <button
        className="btn btn-info btn-sm w-8 px-0 text-lg text-white"
        aria-label="Restart"
        onClick={handleRestart}
      >
        <IoMdRefresh />
      </button>
      <button
        className="btn btn-info btn-sm w-8 px-0 text-lg text-white"
        aria-label="Save"
        onClick={() => {
          if (handleSaveGame) handleSaveGame()
        }}
      >
        <IoMdSave />
      </button>
    </div>
  )
}
