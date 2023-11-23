'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })}>{children}</button>
  )
}
