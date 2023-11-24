import SignInView from '@/components/auth/SignInView'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <div className="container grid h-full place-items-center">
      <SignInView className="max-w-md" />
    </div>
  )
}
