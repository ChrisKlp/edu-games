import { englishQuizzes, gameList, typingGames } from '@/app/gameList'
import GameTile from '@/components/GameTile'

export default function Home() {
  return (
    <section className="container grid gap-6 pt-5">
      <p className="text-center text-2xl font-bold text-sky-600">
        Zadania z matmy:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {gameList.map(({ id, slug, title, icon, bgColor }) => (
          <GameTile
            key={id}
            link={slug}
            title={title}
            Icon={icon}
            className={`${bgColor}`}
          />
        ))}
      </div>
      <p className="text-center text-2xl font-bold text-sky-600">
        English quizzes:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {englishQuizzes.map(({ id, slug, title, icon, bgColor, language }) => (
          <GameTile
            key={id}
            link={slug}
            title={title}
            Icon={icon}
            className={`${bgColor}`}
            ttsLanguage={language}
          />
        ))}
      </div>
      <p className="text-center text-2xl font-bold text-sky-600">
        Przepisywanki:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {typingGames.map(({ id, slug, title, icon, bgColor }) => (
          <GameTile
            key={id}
            link={slug}
            title={title}
            Icon={icon}
            className={`${bgColor}`}
          />
        ))}
      </div>
    </section>
  )
}
