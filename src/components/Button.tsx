import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
} & React.HTMLProps<HTMLButtonElement>

export default function Button({ children, className, onClick }: Props) {
  return (
    <button
      className={cn('rounded-xl bg-pink-700 p-3 text-lg text-white', className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
