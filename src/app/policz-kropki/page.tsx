import NoSSRWrapper from '@/components/NoSSRWrapper'
import CountDotsView from './components/CountDotsView'

export default function Home() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        Policz kropki
      </p>
      <div className="grid h-full grid-rows-[1fr_auto] items-start gap-8 bg-slate-100 py-10">
        <NoSSRWrapper>
          <CountDotsView />
        </NoSSRWrapper>
      </div>
    </section>
  )
}
