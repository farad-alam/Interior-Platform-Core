import { TestimonialForm } from '@/dashboard/forms/TestimonialForm'
import { getTestimonialByIdAction } from '@/core/actions/testimonial.actions'
import { notFound } from 'next/navigation'

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const item = await getTestimonialByIdAction(id)
  if (!item) notFound()
  
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Edit Testimonials</h1></div>
      <TestimonialForm initialData={item} />
    </div>
  )
}