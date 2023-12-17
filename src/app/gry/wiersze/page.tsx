import GameTile from '@/components/GameTile'
import { prisma } from '@/lib/db/prisma'

export default async function PoemsCategoryPage() {
  const games = await prisma.game.findMany({
    where: {
      category: 'wiersze',
    },
  })

  return (
    <section className="container grid gap-6 pt-5">
      <p className="text-center text-2xl font-bold text-sky-600">
        Wierszyki do nauki:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {games.map(({ id, name, slug, language, category }) => (
          <GameTile
            key={id}
            slug={slug}
            link={`/gry/${category}/${slug}`}
            title={name}
            ttsLanguage={language}
          />
        ))}
      </div>
    </section>
  )
}
