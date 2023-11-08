import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/math-games_logo_dark.png'

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Math games logo" width={160} height={0} />
    </Link>
  )
}
