import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

type Props = {
  value: number
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <span
        style={{ width: `${value}%` }}
        className={cn('block h-full rounded-full bg-sky-600 transition-all')}
      />
    </div>
  )
}
