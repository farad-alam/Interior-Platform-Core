'use server'

import { revalidatePath } from 'next/cache'
import { createProject, updateProject, deleteProject } from '@/core/services/project.service'
import { Prisma } from '@prisma/client'

export const createProjectAction = async (data: Prisma.ProjectCreateInput) => {
  try {
    const project = await createProject(data)
    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath('/dashboard/projects')
    return { success: true, data: project }
  } catch (error) {
    return { success: false, error: 'Failed to create project' }
  }
}

export const updateProjectAction = async (id: string, data: Prisma.ProjectUpdateInput) => {
  try {
    const project = await updateProject(id, data)
    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath('/dashboard/projects')
    return { success: true, data: project }
  } catch (error) {
    return { success: false, error: 'Failed to update project' }
  }
}

export const deleteProjectAction = async (id: string) => {
  try {
    await deleteProject(id)
    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath('/dashboard/projects')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete project' }
  }
}
