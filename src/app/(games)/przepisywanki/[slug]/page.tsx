import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import TypingGameView from '@/components/gameViews/TypingGameView'

type Props = { params: { slug: string } }

export default async function TypingGamePage({ params }: Props) {
  const data = await prisma.typingGame.findFirst({
    where: {
      name: params.slug,
    },
  })

  if (!data) {
    notFound()
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold capitalize text-sky-600">
        {`Przepisywanki ${data.name}`}
      </p>
      <div className="bg-slate-100 py-5">
        <TypingGameView data={data} />
      </div>
    </section>
  )
}