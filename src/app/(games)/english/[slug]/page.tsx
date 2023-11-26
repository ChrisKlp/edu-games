import EnglishQuizView from '@/components/gameViews/EnglishQuizView'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'

type Props = { params: { slug: string } }

export default async function EnglishColorPage({ params }: Props) {
  const color = params.slug

  const data = await prisma.englishQuiz.findFirst({
    where: {
      name: color,
    },
    include: {
      values: true,
    },
  })

  if (!data) {
    notFound()
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600 first-letter:uppercase">
        {color}
      </p>
      <div className="bg-slate-100 py-5">
        <EnglishQuizView data={data} />
      </div>
    </section>
  )
}
