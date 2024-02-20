import EnglishQuizView from '@/components/games/EnglishQuiz/EnglishQuizView'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import LettersGameView from '@/components/games/LettersGame/LettersGameView'

type Props = { params: { slug: string } }

export default async function LettersQuizPage({ params: { slug } }: Props) {
  // const data = await prisma.game.findFirst({
  //   where: {
  //     slug: slug,
  //   },
  //   include: {
  //     englishGameData: {
  //       include: {
  //         data: true,
  //       },
  //     },
  //   },
  // })

  // if (!data?.englishGameData?.data) {
  //   notFound()
  // }

  const data = {
    id: 'asdasdasd22323',
    name: 'literki',
    slug: 'literki',
    language: 'pl-PL',
    category: 'letters',
    lettersGameData: {
      gameId: '3d3',
      data: [
        {
          id: 'adsasdm',
          name: 'hulajn',
          image:
            'https://edugames.you2.pl/english//pink-and-violet/watermelon.jpg',
          lettersGameDataGameId: 'ads',
        },
        {
          id: 'qwe',
          name: 'drewno',
          image:
            'https://edugames.you2.pl/english//pink-and-violet/watermelon.jpg',
          lettersGameDataGameId: 'ads2a',
        },
      ],
    },
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
