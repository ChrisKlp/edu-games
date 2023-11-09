import Link from 'next/link'

export default function Home() {
  return (
    <section className="container pt-5">
      <p className="mb-6 text-center text-2xl font-bold text-sky-600">
        Wybierz grę:
      </p>
      <div>
        <Link
          href="/policz-kropki"
          className="block rounded-xl bg-pink-700 p-6 py-10"
        >
          <span className="block text-center text-xl font-bold text-white">
            Policz kropki
          </span>
        </Link>
      </div>
    </section>
  )
}
