'use server'

import { prisma } from '../db/prisma'

export default async function saveGameAction(
  userId: string,
  gameId: string,
  value: string,
) {
  await prisma.gameSave.upsert({
    where: {
      typingGameId_userId: {
        userId: userId,
        typingGameId: gameId,
      },
    },
    update: {
      value: value,
    },
    create: {
      userId: userId,
      typingGameId: gameId,
      value: value,
    },
  })
}
