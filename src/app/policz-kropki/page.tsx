import countDotsGame from '@/lib/games/countDots'
import CountDotsView from './components/CountDotsView'

export default function Home() {
  const game = countDotsGame()

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        Policz kropki
      </p>
      <div className="grid h-full grid-rows-[1fr_auto] bg-slate-100 pb-10">
        <CountDotsView game={game} />
      </div>
    </section>
  )
}
