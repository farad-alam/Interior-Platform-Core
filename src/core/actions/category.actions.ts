'use server'

import { revalidatePath } from 'next/cache'
import { createCategory, updateCategory, deleteCategory } from '@/core/services/category.service'
import { Prisma } from '@prisma/client'

export const createCategoryAction = async (data: Prisma.CategoryCreateInput) => {
  try {
    const category = await createCategory(data)
    revalidatePath('/dashboard/categories')
    revalidatePath('/dashboard/projects')
    return { success: true, data: category }
  } catch (error) {
    return { success: false, error: 'Failed to create category' }
  }
}

export const updateCategoryAction = async (id: string, data: Prisma.CategoryUpdateInput) => {
  try {
    const category = await updateCategory(id, data)
    revalidatePath('/dashboard/categories')
    revalidatePath('/dashboard/projects')
    return { success: true, data: category }
  } catch (error) {
    return { success: false, error: 'Failed to update category' }
  }
}

export const deleteCategoryAction = async (id: string) => {
  try {
    await deleteCategory(id)
    revalidatePath('/dashboard/categories')
    revalidatePath('/dashboard/projects')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete category' }
  }
}
