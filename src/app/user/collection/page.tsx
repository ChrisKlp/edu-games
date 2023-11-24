import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
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
    },
  })

  return (
    <div className="container pt-6">
      {user?.collection.length ? (
        <>
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
        </>
      ) : (
        <p className="text-center">Brak pokemonów</p>
      )}
    </div>
  )
}
