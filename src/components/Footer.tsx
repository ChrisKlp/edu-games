import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export default function Footer({ className }: Props) {
  return (
    <footer className={cn(className, 'container mx-auto py-4')}>
      <p className="text-center text-sm text-slate-400">
        Copyright © 2023 Math Games
      </p>
    </footer>
  )
}
