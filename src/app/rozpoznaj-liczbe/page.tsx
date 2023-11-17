import ListenTheNumberView from '@/components/games/ListenTheNumberView'

export default function ListenTheNumberPage() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        Rozpoznaj liczbę ze słuchu
      </p>
      <div className="bg-slate-100 py-5">
        <ListenTheNumberView />
      </div>
    </section>
  )
}