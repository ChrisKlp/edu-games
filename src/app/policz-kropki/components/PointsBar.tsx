import { getArray, cn } from '@/lib/utils'

type Props = {
  points: number[]
}

export default function PointsBar({ points }: Props) {
  return (
    <div className="flex w-full max-w-sm justify-between place-self-center">
      {getArray(10).map((i) => (
        <div
          key={i}
          className={cn(
            'h-4 w-4 flex-shrink-0 rounded-full',
            points[i]
              ? 'bg-lime-600'
              : points.length > i
              ? 'bg-red-800'
              : 'bg-slate-200',
          )}
        />
      ))}
    </div>
  )
}
