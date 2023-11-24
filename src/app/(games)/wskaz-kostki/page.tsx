import WhichDiceView from '@/components/gameViews/WhichDiceView'

export default function WhichDicePage() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        Wskaż poprawne kostki
      </p>
      <div className="bg-slate-100 py-5">
        <WhichDiceView />
      </div>
    </section>
  )
}
