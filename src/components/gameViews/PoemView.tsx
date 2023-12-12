'use client'

import { Game, PoemGameData } from '@prisma/client'
import TextSelect from '../game/TextSelect'
import { useState } from 'react'
import SpeakerButton from '../SpeakerButton'

type Props = {
  data: Game & { poemGameData: PoemGameData | null }
}

export default function PoemView({ data }: Props) {
  const { poemGameData } = data
  const [selected, setSelected] = useState<number[]>([])
  const fullData = poemGameData?.data ? (poemGameData.data as string[]) : []

  const tts = fullData
    .filter((_, index) => selected.includes(index))
    .join(',\n')

  return (
    <div className="container grid h-full gap-8">
      <div className="grid justify-items-center gap-4">
        {fullData.map((item, index) => (
          <TextSelect
            isSelected={selected.includes(index)}
            key={item}
            onClick={() =>
              setSelected((prev) =>
                prev.includes(index)
                  ? prev.filter((idx) => idx !== index)
                  : [...prev, index],
              )
            }
          >
            {item}
          </TextSelect>
        ))}
        <SpeakerButton variant="big" text={tts} className="btn-primary" />
      </div>
    </div>
  )
}
