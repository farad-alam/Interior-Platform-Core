'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getStatsAction = async () => {
  return prisma.statCounter.findMany({
    orderBy: { order: 'asc' }
  })
}

export const getStatByIdAction = async (id: string) => {
  return prisma.statCounter.findUnique({ where: { id } })
}

export const createStatAction = async (data: Prisma.StatCounterCreateInput) => {
  try {
    const stat = await prisma.statCounter.create({ data })
    revalidatePath('/')
    revalidatePath('/dashboard/stats')
    return { success: true, data: stat }
  } catch (error) {
    return { success: false, error: 'Failed to create stat' }
  }
}

export const updateStatAction = async (id: string, data: Prisma.StatCounterUpdateInput) => {
  try {
    const stat = await prisma.statCounter.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/dashboard/stats')
    return { success: true, data: stat }
  } catch (error) {
    return { success: false, error: 'Failed to update stat' }
  }
}

export const deleteStatAction = async (id: string) => {
  try {
    await prisma.statCounter.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/dashboard/stats')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete stat' }
  }
}
