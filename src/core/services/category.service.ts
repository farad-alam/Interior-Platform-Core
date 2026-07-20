import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getCategories = async (type?: 'project' | 'gallery') => {
  return await prisma.category.findMany({
    where: type ? { type } : {},
    orderBy: { createdAt: 'desc' },
  })
}

export const getCategoryBySlug = async (slug: string) => {
  return await prisma.category.findUnique({
    where: { slug },
  })
}

export const createCategory = async (data: Prisma.CategoryCreateInput) => {
  return await prisma.category.create({
    data,
  })
}

export const updateCategory = async (id: string, data: Prisma.CategoryUpdateInput) => {
  return await prisma.category.update({
    where: { id },
    data,
  })
}

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  })
}
