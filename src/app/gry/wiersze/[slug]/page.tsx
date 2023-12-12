import PoemView from '@/components/gameViews/PoemView'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

type Props = { params: { slug: string } }

export default async function PoemPage({ params: { slug } }: Props) {
  const data = await prisma.game.findFirst({
    where: {
      slug: slug,
    },
    include: {
      poemGameData: true,
    },
  })

  if (!data?.poemGameData?.data) {
    notFound()
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600 first-letter:uppercase">
        {slug}
      </p>
      <div className="bg-slate-100 py-5">
        <PoemView data={data} />
      </div>
    </section>
  )
}
