import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import SingleGameScore from '@/components/SingleGameScore'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function CollectionPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/user/collection')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      collection: true,
      gameScore: {
        include: {
          game: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      },
    },
  })

  const totalPoints = user?.gameScore.reduce(
    (total, item) => total + item.data,
    0,
  )

  return (
    <div className="container pt-6">
      <div className="mb-12 grid justify-items-center gap-5">
        <div className="grid w-full justify-items-center rounded-3xl bg-gradient-to-r from-indigo-500 to-pink-600 p-5 text-6xl text-white">
          <span className="text-sm">Zdobyte punkty</span>
          <span className="font-bold">{totalPoints}</span>
        </div>
        <div className="grid w-full grid-cols-4 gap-5">
          {user?.gameScore.map(({ gameId, data, game }) => (
            <SingleGameScore
              key={gameId}
              slug={game.slug}
              title={game.name}
              score={data}
            />
          ))}
        </div>
      </div>
      {user?.collection.length ? (
        <div>
          <h1 className="mb-10 text-center text-2xl font-bold text-sky-500">
            Twoja kolekcja pokemonów
          </h1>
          <div className="grid grid-cols-3 place-items-center gap-6">
            {user.collection.map(({ id, image, name }) => (
              <div key={id} className="grid place-items-center gap-2">
                <Image src={image} width={300} height={300} alt={name} />
                <p className="text-center font-bold uppercase">{name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">Brak pokemonów</p>
      )}
    </div>
  )
}
