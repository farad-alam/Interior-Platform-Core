'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getTrustFeaturesAction = async () => {
  return prisma.trustFeature.findMany({
    orderBy: { order: 'asc' }
  })
}

export const getTrustFeatureByIdAction = async (id: string) => {
  return prisma.trustFeature.findUnique({ where: { id } })
}

export const createTrustFeatureAction = async (data: Prisma.TrustFeatureCreateInput) => {
  try {
    const feature = await prisma.trustFeature.create({ data })
    revalidatePath('/')
    revalidatePath('/dashboard/trust-features')
    return { success: true, data: feature }
  } catch (error) {
    return { success: false, error: 'Failed to create trust feature' }
  }
}

export const updateTrustFeatureAction = async (id: string, data: Prisma.TrustFeatureUpdateInput) => {
  try {
    const feature = await prisma.trustFeature.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/dashboard/trust-features')
    return { success: true, data: feature }
  } catch (error) {
    return { success: false, error: 'Failed to update trust feature' }
  }
}

export const deleteTrustFeatureAction = async (id: string) => {
  try {
    await prisma.trustFeature.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/dashboard/trust-features')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete trust feature' }
  }
}
