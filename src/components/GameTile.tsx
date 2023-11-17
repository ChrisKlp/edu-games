import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IconType } from 'react-icons'
import TalkingButton from './TalkingButton'

type Props = {
  link: string
  title: string
  Icon: IconType
  className?: string
  ttsLanguage?: string
}

export default function GameTile({
  link,
  title,
  Icon,
  className,
  ttsLanguage,
}: Props) {
  return (
    <div className={cn('relative rounded-xl bg-pink-700', className)}>
      <Link
        href={link}
        className="grid justify-items-center gap-4 p-4 text-white"
      >
        <span>
          <Icon className="h-auto w-20" />
        </span>
        <span className="text-center text-xl font-bold">{title}</span>
      </Link>
      <TalkingButton
        className="absolute right-2 top-2"
        text={title}
        language={ttsLanguage}
      />
    </div>
  )
}