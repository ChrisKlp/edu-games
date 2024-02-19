import dice1 from '@/assets/dice/dice-1.svg'
import dice2 from '@/assets/dice/dice-2.svg'
import dice3 from '@/assets/dice/dice-3.svg'
import dice4 from '@/assets/dice/dice-4.svg'
import dice5 from '@/assets/dice/dice-5.svg'
import dice6 from '@/assets/dice/dice-6.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const images: { [key: number]: any } = {
  1: dice1,
  2: dice2,
  3: dice3,
  4: dice4,
  5: dice5,
  6: dice6,
}

type Props = {
  number: number
  className?: string
}

export default function Dice({ number, className }: Props) {
  return (
    <Image
      priority
      src={images[number]}
      alt={`Dice ${number}`}
      className={cn(
        'max-w-[125px] drop-shadow-2xl sm:max-w-[150px]',
        className,
      )}
    />
  )
}
