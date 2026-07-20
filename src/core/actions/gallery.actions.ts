'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getGalleryAction = async () => {
  return prisma.galleryItem.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export const getGalleryItemByIdAction = async (id: string) => {
  return prisma.galleryItem.findUnique({ where: { id } })
}

export const createGalleryItemAction = async (data: Prisma.GalleryItemCreateInput) => {
  try {
    const item = await prisma.galleryItem.create({ data })
    revalidatePath('/')
    revalidatePath('/dashboard/gallery')
    return { success: true, data: item }
  } catch (error) {
    return { success: false, error: 'Failed to create gallery item' }
  }
}

export const updateGalleryItemAction = async (id: string, data: Prisma.GalleryItemUpdateInput) => {
  try {
    const item = await prisma.galleryItem.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/dashboard/gallery')
    return { success: true, data: item }
  } catch (error) {
    return { success: false, error: 'Failed to update gallery item' }
  }
}

export const deleteGalleryItemAction = async (id: string) => {
  try {
    await prisma.galleryItem.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/dashboard/gallery')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete gallery item' }
  }
}
