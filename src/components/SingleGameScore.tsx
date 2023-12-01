import { getGameStyles } from '@/app/gameList'
import { cn } from '@/lib/utils'

type Props = {
  slug: string
  title: string
  score: number
  className?: string
}

export default function SingleGameScore({
  title,
  slug,
  score,
  className,
}: Props) {
  const { bgColor, Icon } = getGameStyles(slug)

  return (
    <div className="tooltip" data-tip={title}>
      <div
        className={cn(
          'flex items-center justify-center gap-3 rounded-full bg-pink-700 p-2 text-white',
          bgColor,
          className,
        )}
      >
        <Icon className="h-auto w-6" />
        <span className="font-bold">{score}</span>
      </div>
    </div>
  )
}
