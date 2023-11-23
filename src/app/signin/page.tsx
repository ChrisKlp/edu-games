import SignInView from '@/components/auth/SignInView'

export default function page() {
  return (
    <div className="container grid h-full place-items-center">
      <SignInView className="max-w-md" />
    </div>
  )
}
