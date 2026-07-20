'use server'

import { revalidatePath } from 'next/cache'
import { createService, updateService, deleteService } from '@/core/services/service.service'
import { Prisma } from '@prisma/client'

export const createServiceAction = async (data: Prisma.ServiceCreateInput) => {
  try {
    const service = await createService(data)
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/dashboard/services')
    return { success: true, data: service }
  } catch (error) {
    return { success: false, error: 'Failed to create service' }
  }
}

export const updateServiceAction = async (id: string, data: Prisma.ServiceUpdateInput) => {
  try {
    const service = await updateService(id, data)
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/dashboard/services')
    return { success: true, data: service }
  } catch (error) {
    return { success: false, error: 'Failed to update service' }
  }
}

export const deleteServiceAction = async (id: string) => {
  try {
    await deleteService(id)
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/dashboard/services')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete service' }
  }
}
