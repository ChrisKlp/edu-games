import { cn } from '@/lib/utils'
import Link from 'next/link'
import SpeakerButton from './SpeakerButton'
import { getGameStyles } from '@/app/gameList'

type Props = {
  link: string
  slug: string
  title: string
  className?: string
  ttsLanguage?: string | null
}

export default function GameTile({
  link,
  title,
  slug,
  className,
  ttsLanguage,
}: Props) {
  const { bgColor, Icon } = getGameStyles(slug)

  return (
    <div className={cn('relative rounded-xl bg-pink-700', bgColor, className)}>
      <Link
        href={link}
        className="grid justify-items-center gap-4 p-4 text-white"
      >
        <span>
          <Icon className="h-auto w-20" />
        </span>
        <span className="text-center text-xl font-bold">{title}</span>
      </Link>
      <SpeakerButton
        className="absolute right-2 top-2"
        text={title}
        language={ttsLanguage}
      />
    </div>
  )
}
