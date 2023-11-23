import { cn } from '@/lib/utils'
import Logo from './Logo'
import { getServerSession } from 'next-auth'
import { TbLogout2 } from 'react-icons/tb'
import AvatarButton from './AvatarButton'
import { FaUserAlt } from 'react-icons/fa'
import { CgPokemon } from 'react-icons/cg'
import Link from 'next/link'
import SignOutButton from './auth/SignOutButton'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

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
          <div className="dropdown dropdown-end">
            <AvatarButton tabIndex={0} session={session} />
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li className="rounded-lg hover:bg-slate-100">
                <a href="">
                  <CgPokemon /> Kolekcja
                </a>
              </li>
              <li className="rounded-lg hover:bg-slate-100">
                <SignOutButton>
                  <TbLogout2 /> Wyloguj się
                </SignOutButton>
              </li>
            </ul>
          </div>
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
