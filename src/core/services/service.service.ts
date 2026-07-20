import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getServices = async (includeDrafts = false) => {
  return await prisma.service.findMany({
    where: includeDrafts ? {} : { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  })
}

export const getServiceBySlug = async (slug: string) => {
  return await prisma.service.findUnique({
    where: { slug },
  })
}

export const getServiceById = async (id: string) => {
  return await prisma.service.findUnique({
    where: { id },
  })
}

export const createService = async (data: Prisma.ServiceCreateInput) => {
  return await prisma.service.create({
    data,
  })
}

export const updateService = async (id: string, data: Prisma.ServiceUpdateInput) => {
  return await prisma.service.update({
    where: { id },
    data,
  })
}

export const deleteService = async (id: string) => {
  return await prisma.service.delete({
    where: { id },
  })
}
