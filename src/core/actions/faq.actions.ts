'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getFaqsAction = async () => {
  return prisma.fAQ.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export const getFaqByIdAction = async (id: string) => {
  return prisma.fAQ.findUnique({ where: { id } })
}

export const createFaqAction = async (data: Prisma.FAQCreateInput) => {
  try {
    const faq = await prisma.fAQ.create({ data })
    revalidatePath('/')
    revalidatePath('/dashboard/faqs')
    return { success: true, data: faq }
  } catch (error) {
    return { success: false, error: 'Failed to create FAQ' }
  }
}

export const updateFaqAction = async (id: string, data: Prisma.FAQUpdateInput) => {
  try {
    const faq = await prisma.fAQ.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/dashboard/faqs')
    return { success: true, data: faq }
  } catch (error) {
    return { success: false, error: 'Failed to update FAQ' }
  }
}

export const deleteFaqAction = async (id: string) => {
  try {
    await prisma.fAQ.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/dashboard/faqs')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete FAQ' }
  }
}
