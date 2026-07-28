'use server'

import { prisma } from '@/core/db/client'
import { revalidatePath } from 'next/cache'

export async function getBrandLogosAction() {
  try {
    const brands = await prisma.brandLogo.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return brands
  } catch (error) {
    console.error('Error fetching brand logos:', error)
    return []
  }
}

export async function getPublishedBrandLogosAction() {
  try {
    const brands = await prisma.brandLogo.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return brands
  } catch (error) {
    console.error('Error fetching published brand logos:', error)
    return []
  }
}

export async function getBrandLogoAction(id: string) {
  try {
    const brand = await prisma.brandLogo.findUnique({
      where: { id }
    })
    return brand
  } catch (error) {
    console.error('Error fetching brand logo:', error)
    return null
  }
}

export async function createBrandLogoAction(data: any) {
  try {
    const brand = await prisma.brandLogo.create({
      data: {
        name: data.name,
        nameAr: data.nameAr,
        imageUrl: data.imageUrl,
        url: data.url,
        order: data.order ? parseInt(data.order) : 0,
        status: data.status || 'DRAFT',
      }
    })

    revalidatePath('/')
    revalidatePath('/dashboard/brands')
    return { success: true, data: brand }
  } catch (error: any) {
    console.error('Error creating brand logo:', error)
    return { success: false, error: error.message }
  }
}

export async function updateBrandLogoAction(id: string, data: any) {
  try {
    const brand = await prisma.brandLogo.update({
      where: { id },
      data: {
        name: data.name,
        nameAr: data.nameAr,
        imageUrl: data.imageUrl,
        url: data.url,
        order: data.order !== undefined ? parseInt(data.order) : undefined,
        status: data.status,
      }
    })

    revalidatePath('/')
    revalidatePath('/dashboard/brands')
    return { success: true, data: brand }
  } catch (error: any) {
    console.error('Error updating brand logo:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteBrandLogoAction(id: string) {
  try {
    await prisma.brandLogo.delete({
      where: { id }
    })
    
    revalidatePath('/')
    revalidatePath('/dashboard/brands')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting brand logo:', error)
    return { success: false, error: error.message }
  }
}
