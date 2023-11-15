import Pokemon2 from '@/components/Pokemon'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="container pt-5">
      <p className="mb-6 text-center text-2xl font-bold text-sky-600">
        Wybierz grę:
      </p>
      <div className="grid gap-4">
        <Link
          href="/policz-kropki"
          className="block rounded-xl bg-pink-700 p-4"
        >
          <span className="block text-center text-xl font-bold text-white">
            Policz kropki
          </span>
        </Link>
        <Link href="/dodaj-cyfry" className="block rounded-xl bg-pink-700 p-4">
          <span className="block text-center text-xl font-bold text-white">
            Dodaj cyfry
          </span>
        </Link>
        <Link
          href="/rozpoznaj-liczbe"
          className="block rounded-xl bg-pink-700 p-4"
        >
          <span className="block text-center text-xl font-bold text-white">
            Rozpoznaj liczbę ze słuchu
          </span>
        </Link>
      </div>
    </section>
  )
}
