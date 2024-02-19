import EnglishQuizView from '@/components/games/EnglishQuiz/EnglishQuizView'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'

type Props = { params: { slug: string } }

export default async function EnglishQuizPage({ params: { slug } }: Props) {
  const data = await prisma.game.findFirst({
    where: {
      slug: slug,
    },
    include: {
      englishGameData: {
        include: {
          data: true,
        },
      },
    },
  })

  if (!data?.englishGameData?.data) {
    notFound()
  }

  console.log(data)

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600 first-letter:uppercase">
        {slug}
      </p>
      <div className="bg-slate-100 py-5">
        <EnglishQuizView data={data} />
      </div>
    </section>
  )
}
