import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa'
import Logo from './Logo'
import UserMenu from './UserMenu'

type Props = {
  className?: string
}

export default async function Navbar({ className }: Props) {
  const session = await getServerSession(authOptions)

  return (
    <nav className={cn('relative', className)}>
      <div className="container flex justify-between pb-5 pt-3">
        <Logo />
        {session && session.user ? (
          <UserMenu session={session} />
        ) : (
          <Link href="/signin">
            <div className="avatar placeholder">
              <div className="w-10 rounded-full bg-neutral-content">
                <FaUserAlt className="text-white" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </nav>
  )
}
