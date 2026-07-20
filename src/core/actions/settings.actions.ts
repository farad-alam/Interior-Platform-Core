'use server'

import { revalidatePath } from 'next/cache'
import { getSiteSettings, updateSiteSettings } from '@/core/services/settings.service'
import { Prisma } from '@prisma/client'

export const updateSettingsAction = async (id: string, data: Prisma.SiteSettingsUpdateInput) => {
  try {
    const updated = await updateSiteSettings(id, data)
    revalidatePath('/')
    revalidatePath('/dashboard/settings')
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: 'Failed to update settings' }
  }
}
