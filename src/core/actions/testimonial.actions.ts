'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/core/db/client'
import { Prisma } from '@prisma/client'

export const getTestimonialsAction = async () => {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export const getTestimonialByIdAction = async (id: string) => {
  return prisma.testimonial.findUnique({ where: { id } })
}

export const createTestimonialAction = async (data: Prisma.TestimonialCreateInput) => {
  try {
    const testimonial = await prisma.testimonial.create({ data })
    revalidatePath('/')
    revalidatePath('/dashboard/testimonials')
    return { success: true, data: testimonial }
  } catch (error) {
    return { success: false, error: 'Failed to create testimonial' }
  }
}

export const updateTestimonialAction = async (id: string, data: Prisma.TestimonialUpdateInput) => {
  try {
    const testimonial = await prisma.testimonial.update({ where: { id }, data })
    revalidatePath('/')
    revalidatePath('/dashboard/testimonials')
    return { success: true, data: testimonial }
  } catch (error) {
    return { success: false, error: 'Failed to update testimonial' }
  }
}

export const deleteTestimonialAction = async (id: string) => {
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/dashboard/testimonials')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete testimonial' }
  }
}
