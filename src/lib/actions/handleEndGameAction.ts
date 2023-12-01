'use server'

import { prisma } from '../db/prisma'
import { revalidatePath } from 'next/cache'

export default async function handleEndGameAction(
  userId: string,
  gameId: string,
  pathname: string,
) {
  const updateScore = prisma.gameScore.upsert({
    where: {
      gameId_userId: {
        userId: userId,
        gameId: gameId,
      },
    },
    update: {
      data: { increment: 1 },
    },
    create: {
      userId: userId,
      gameId: gameId,
      data: 1,
    },
  })

  const deleteSaveGame = prisma.gameSave.deleteMany({
    where: {
      gameId: gameId,
      userId: userId,
    },
  })

  try {
    await prisma.$transaction([updateScore, deleteSaveGame])
  } catch (error) {
    return { error: 'Punkty nie zostały zaktualizowane' }
  }

  revalidatePath(pathname)
}
