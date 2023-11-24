import AdditionTo12View from '@/components/gameViews/AdditionTo12View'

export default function CountDotsPage() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        Policz kropki
      </p>
      <div className="bg-slate-100 py-5">
        <AdditionTo12View />
      </div>
    </section>
  )
}
