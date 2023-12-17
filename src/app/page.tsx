import SpeakerButton from '@/components/SpeakerButton'
import { prisma } from '@/lib/db/prisma'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { getGameCategories } from './gameList'

export default async function Home() {
  const categories = await prisma.gameCategory.findMany()

  return (
    <section className="container grid gap-6 pt-5">
      <div className="grid grid-cols-2 gap-4">
        {categories.map(({ name }) => {
          const { Icon, bgColor } = getGameCategories(name)
          return (
            <div
              key={name}
              className={cn('relative rounded-xl bg-pink-700', bgColor)}
            >
              <Link
                href={`/gry/${name}`}
                className="grid justify-items-center gap-4 p-4 text-white"
              >
                <span>
                  <Icon className="h-auto w-20" />
                </span>
                <span className="text-center text-xl font-bold capitalize">
                  {name}
                </span>
              </Link>
              <SpeakerButton
                className="absolute right-2 top-2"
                text={name}
                language={name === 'english' ? 'en-EN' : 'pl-PL'}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
