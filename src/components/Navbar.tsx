import { cn } from '@/lib/utils'
import Logo from './Logo'

type Props = {
  className?: string
}

export default function Navbar({ className }: Props) {
  return (
    <nav className={cn(className)}>
      <div className="container grid place-items-center pb-5 pt-3">
        <Logo />
      </div>
    </nav>
  )
}
