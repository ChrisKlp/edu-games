'use client'

import { cn } from '@/lib/utils'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'

type Props = {
  provider: ClientSafeProvider
  className?: string
}

export default function SignInButton({ provider, className }: Props) {
  return (
    <button
      className={cn('btn bg-red-600 text-white hover:bg-red-700', className)}
      onClick={() => signIn(provider.id)}
    >
      <FaGoogle /> Zaloguj się przez {provider.name}
    </button>
  )
}
