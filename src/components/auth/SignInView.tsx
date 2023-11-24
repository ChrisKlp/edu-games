import { cn } from '@/lib/utils'
import { getProviders } from 'next-auth/react'
import { TbLogin2 } from 'react-icons/tb'
import SignInButton from './SignInButton'

type Props = {
  className?: string
}

export default async function SignInView({ className }: Props) {
  const providers = await getProviders()

  return (
    <div
      className={cn(
        'mx-auto grid w-full justify-items-center gap-6 rounded-2xl border border-slate-200 p-6 pt-12',
        className,
      )}
    >
      <TbLogin2 className="block text-6xl text-slate-300" />
      <div className="text-center">
        <h1 className="text-2xl font-bold">Zaloguj się</h1>
        <p>Zaloguj się aby zapisywać swój postęp</p>
      </div>
      <div className="h-[1px] w-full bg-slate-200" />
      {providers &&
        Object.values(providers).map((provider) => (
          <SignInButton
            key={provider.name}
            provider={provider}
            className="w-full"
          />
        ))}
    </div>
  )
}
