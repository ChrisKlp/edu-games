import { cn } from '@/lib/utils'

type Props = {
  isSelected?: boolean
  children: React.ReactNode
  onClick: () => void
}

export default function TextSelect({ isSelected, children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-2xl font-bold text-pink-950',
        isSelected && 'font-extrabold text-pink-600',
      )}
    >
      {children}
    </button>
  )
}
