'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'
import { CgPokemon } from 'react-icons/cg'
import { TbLogout2 } from 'react-icons/tb'
import AvatarButton from './AvatarButton'

type Props = {
  session: Session
}

export default function UserMenu({ session }: Props) {
  const dropDownRef = useRef<HTMLButtonElement | null>(null)

  const handleClick = () => {
    const elem = document.activeElement as HTMLElement
    if (elem) {
      elem?.blur()
    }
  }

  const handleSignOutClick = () => {
    signOut({ callbackUrl: '/' })
    handleClick()
  }

  return (
    <div className="dropdown dropdown-end h-[40px]">
      <AvatarButton ref={dropDownRef} tabIndex={0} session={session} />
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-lg z-[1] w-52 rounded-box bg-base-100 p-2 shadow md:menu-md"
      >
        <li>
          <Link href="/user/collection" onClick={handleClick}>
            <CgPokemon /> Kolekcja
          </Link>
        </li>
        <li>
          <button onClick={handleSignOutClick}>
            <TbLogout2 /> Wyloguj się
          </button>
        </li>
      </ul>
    </div>
  )
}
