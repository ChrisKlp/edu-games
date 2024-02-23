import EnglishQuizView from '@/components/games/EnglishQuiz/EnglishQuizView'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import LettersGameView from '@/components/games/LettersGame/LettersGameView'

type Props = { params: { slug: string } }

export default async function LettersQuizPage({ params: { slug } }: Props) {
  const data = await prisma.game.findFirst({
    where: {
      slug: slug,
    },
    include: {
      lettersGameData: {
        include: {
          data: true,
        },
      },
    },
  })

  if (!data?.lettersGameData?.data) {
    notFound()
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600 first-letter:uppercase">
        {slug}
      </p>
      <div className="bg-slate-100 py-5">
        <LettersGameView data={data} />
      </div>
    </section>
  )
}
