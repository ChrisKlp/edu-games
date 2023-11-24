import { prisma } from '@/lib/db/prisma'
import { uploadImage } from '@/lib/ftp/uploadImage'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'
import { Readable } from 'stream'
import { authOptions } from '../auth/[...nextauth]/authOptions'

async function pushPokemon(userId: string, pokemonId: string) {
  console.log('Here we are')
  console.log('userId', userId)
  console.log('pokemonId', pokemonId)
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      collection: {
        connect: {
          id: pokemonId,
        },
      },
    },
  })
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  console.log('userid', userId)
  console.log('userid', userId)
  console.log('userid', userId)

  const searchParams = request.nextUrl.searchParams
  const randomId = searchParams.get('randomId')

  if (!randomId) {
    throw new Error('Missing required data')
  }

  const listResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${randomId}&limit=1`,
  )

  if (!listResponse.ok) {
    throw new Error('Pokemon Api failed')
  }

  const listJson = await listResponse.json()
  const itemName = listJson.results[0]?.name as string
  const itemUrl = listJson.results[0]?.url as string

  const duplicatedPokemon = await prisma.pokemon.findFirst({
    where: {
      name: itemName,
    },
  })

  const pokemon = {
    name: itemName,
    image: '',
  }

  if (!duplicatedPokemon) {
    const itemResponse = await fetch(itemUrl)

    if (!itemResponse.ok) {
      throw new Error('Pokemon Api failed')
    }

    const itemJson = await itemResponse.json()
    const name = itemJson.name
    const imageUrl = itemJson?.sprites?.other['official-artwork']?.front_default

    if (!imageUrl || !name) {
      throw new Error('Missing pokemon image or name')
    }

    const imageResponse = await fetch(imageUrl)

    if (!imageResponse.ok) {
      throw new Error('Fetching image failed')
    }
    const buffer = Buffer.from(await imageResponse.arrayBuffer())
    const imgReadable = Readable.from(buffer)

    await uploadImage(imgReadable, `${name}.png`)

    const newPokemon = await prisma.pokemon.create({
      data: {
        name: name,
        image: `${process.env.IMAGES_URL}/${name}.png`,
      },
    })

    if (userId) {
      pushPokemon(userId, newPokemon.id)
    }

    pokemon.name = newPokemon.name
    pokemon.image = newPokemon.image
  } else {
    if (userId) {
      const userWithPokemon = await prisma.user.findFirst({
        where: {
          id: userId,
          collection: {
            some: {
              id: duplicatedPokemon.id,
            },
          },
        },
      })

      if (!userWithPokemon) {
        pushPokemon(userId, duplicatedPokemon.id)
      }
    }
    pokemon.name = duplicatedPokemon.name
    pokemon.image = duplicatedPokemon.image
  }

  return Response.json(pokemon)
}
