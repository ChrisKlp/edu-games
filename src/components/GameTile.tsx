import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IconType } from 'react-icons'

type Props = {
  link: string
  title: string
  Icon: IconType
  className?: string
}

export default function GameTile({ link, title, Icon, className }: Props) {
  return (
    <Link
      href={link}
      className={cn('block rounded-xl bg-pink-700 p-4', className)}
    >
      <span className="grid justify-items-center gap-4 text-white">
        <span>
          <Icon className="h-auto w-20" />
        </span>
        <span className="text-center text-xl font-bold">{title}</span>
      </span>
    </Link>
  )
}
