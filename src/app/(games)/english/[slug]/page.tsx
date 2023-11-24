import EnglishQuizView from '@/components/gameViews/EnglishQuizView'
import { notFound } from 'next/navigation'
import data from '@/lib/EnglishQuiz/data'

type Props = { params: { slug: string } }

export default function EnglishColorPage({ params }: Props) {
  const color = params.slug

  if (!Object.keys(data).includes(color)) {
    notFound()
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600 first-letter:uppercase">
        {color}
      </p>
      <div className="bg-slate-100 py-5">
        <EnglishQuizView color={color} />
      </div>
    </section>
  )
}
