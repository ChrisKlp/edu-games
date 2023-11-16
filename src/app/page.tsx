import GameTile from '@/components/GameTile'
import gameList from '@/components/games/gameList'

export default function Home() {
  return (
    <section className="container pt-5">
      <p className="mb-6 text-center text-2xl font-bold text-sky-600">
        Wybierz grę:
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
    </section>
  )
}
