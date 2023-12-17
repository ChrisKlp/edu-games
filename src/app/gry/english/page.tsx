import GameTile from '@/components/GameTile'
import { prisma } from '@/lib/db/prisma'

export default async function EnglishCategoryPage() {
  const games = await prisma.game.findMany({
    where: {
      category: 'english',
    },
  })

  return (
    <section className="container grid gap-6 pt-5">
      <p className="text-center text-2xl font-bold text-sky-600">
        English quizzes:
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
