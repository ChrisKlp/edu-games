import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/math-games_logo_dark.png'

export default function Logo() {
  return (
    <Link href="/" className="max-w-[150px]">
      <Image priority src={logo} alt="Math games logo" />
    </Link>
  )
}
