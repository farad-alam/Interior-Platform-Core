import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getProjects = async (includeDrafts = false) => {
  return await prisma.project.findMany({
    where: includeDrafts ? {} : { status: 'PUBLISHED' },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const getProjectBySlug = async (slug: string) => {
  return await prisma.project.findUnique({
    where: { slug },
    include: { category: true },
  })
}

export const getProjectById = async (id: string) => {
  return await prisma.project.findUnique({
    where: { id },
    include: { category: true },
  })
}

export const createProject = async (data: Prisma.ProjectCreateInput) => {
  return await prisma.project.create({
    data,
  })
}

export const updateProject = async (id: string, data: Prisma.ProjectUpdateInput) => {
  return await prisma.project.update({
    where: { id },
    data,
  })
}

export const deleteProject = async (id: string) => {
  return await prisma.project.delete({
    where: { id },
  })
}
