'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../db/prisma'

export default async function saveGameAction(
  userId: string,
  gameId: string,
  value: string,
  pathname: string,
) {
  try {
    await prisma.gameSave.upsert({
      where: {
        gameId_userId: {
          userId: userId,
          gameId: gameId,
        },
      },
      update: {
        value: value,
      },
      create: {
        userId: userId,
        gameId: gameId,
        value: value,
      },
    })
  } catch (error) {
    return { error: 'Gra nie zapisała się' }
  }

  revalidatePath(pathname)
}
