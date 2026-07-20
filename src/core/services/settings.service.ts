import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getSiteSettings = async () => {
  const settings = await prisma.siteSettings.findFirst()
  return settings
}

export const updateSiteSettings = async (id: string, data: Prisma.SiteSettingsUpdateInput) => {
  return await prisma.siteSettings.update({
    where: { id },
    data,
  })
}

export const createInitialSiteSettings = async (data: Prisma.SiteSettingsCreateInput) => {
  return await prisma.siteSettings.create({
    data,
  })
}
