import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import TypingGameView from '@/components/gameViews/TypingGameView'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

type Props = { params: { slug: string } }

export default async function TypingGamePage({ params: { slug } }: Props) {
  const session = await getServerSession(authOptions)
  const data = await prisma.game.findFirst({
    where: {
      slug: slug,
    },
    include: {
      typingGameData: true,
    },
  })

  if (!data?.typingGameData?.data) {
    notFound()
  }

  let startRound = 1

  if (session?.user.id) {
    const gameSave = await prisma.gameSave.findFirst({
      where: {
        gameId: data.id,
        userId: session?.user.id,
      },
    })

    if (gameSave?.data) {
      startRound = +gameSave.data
    }
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        {`Przepisywanki - ${data.name}`}
      </p>
      <div className="bg-slate-100 py-5">
        <TypingGameView data={data} startRound={startRound} />
      </div>
    </section>
  )
}
