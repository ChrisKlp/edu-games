import GameTile from '@/components/GameTile'
import { prisma } from '@/lib/db/prisma'

export default async function Home() {
  const games = await prisma.game.findMany()

  const mathGames = games.filter((item) => item.category === 'matematyka')
  const englishGames = games.filter((item) => item.category === 'english')
  const typingGames = games.filter((item) => item.category === 'pisanie')

  return (
    <section className="container grid gap-6 pt-5">
      <p className="text-center text-2xl font-bold text-sky-600">
        Zadania z matmy:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {mathGames.map(({ id, name, slug, language, category }) => (
          <GameTile
            key={id}
            slug={slug}
            link={`/gry/${category}/${slug}`}
            title={name}
            ttsLanguage={language}
          />
        ))}
      </div>
      <p className="text-center text-2xl font-bold text-sky-600">
        English quizzes:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {englishGames.map(({ id, name, slug, language, category }) => (
          <GameTile
            key={id}
            slug={slug}
            link={`/gry/${category}/${slug}`}
            title={name}
            ttsLanguage={language}
          />
        ))}
      </div>
      <p className="text-center text-2xl font-bold text-sky-600">
        Przepisywanki:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {typingGames.map(({ id, name, slug, language, category }) => (
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
