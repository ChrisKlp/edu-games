import AdditionTo12View from '@/components/gameViews/AdditionTo12View'
import ListenTheNumberView from '@/components/gameViews/ListenTheNumberView'
import WhichDiceView from '@/components/gameViews/WhichDiceView'
import { prisma } from '@/lib/db/prisma'
import { Level } from '@/types'
import { notFound } from 'next/navigation'

type Props = { params: { slug: string } }

export default async function MathGamePage({ params: { slug } }: Props) {
  const data = await prisma.game.findFirst({
    where: {
      slug: slug,
    },
  })

  if (!data) {
    notFound()
  }

  const getGameView = () => {
    switch (slug) {
      case 'policz-kropki':
        return <AdditionTo12View data={data} />
      case 'dodaj-cyfry':
        return (
          <AdditionTo12View variant="numbers" level={Level.easy} data={data} />
        )
      case 'rozpoznaj-liczbe':
        return <ListenTheNumberView data={data} />
      case 'wskaz-kostki':
        return <WhichDiceView data={data} />
      default:
        notFound()
    }
  }

  return (
    <section className="grid h-full grid-rows-[auto_1fr] pt-5">
      <p className="container mb-6 text-center text-2xl font-bold text-sky-600">
        {data.name}
      </p>
      <div className="bg-slate-100 py-5">{getGameView()}</div>
    </section>
  )
}
