import AdditionTo12View from '@/components/gameViews/AdditionTo12View'
import { Level } from '@/types'

export default function AddNumbersPage() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        Dodaj cyfry
      </p>
      <div className="bg-slate-100 py-5">
        <AdditionTo12View variant="numbers" level={Level.easy} />
      </div>
    </section>
  )
}
