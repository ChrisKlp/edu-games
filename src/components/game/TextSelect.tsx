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
        'text-2xl font-bold text-red-900',
        isSelected && 'text-red-600',
      )}
    >
      {children}
    </button>
  )
}
