import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getMediaFiles = async () => {
  return await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const createMedia = async (data: Prisma.MediaCreateInput) => {
  return await prisma.media.create({
    data,
  })
}

export const deleteMedia = async (id: string) => {
  return await prisma.media.delete({
    where: { id },
  })
}

export const getMediaById = async (id: string) => {
  return await prisma.media.findUnique({
    where: { id },
  })
}
