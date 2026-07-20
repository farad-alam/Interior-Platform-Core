import { TestimonialForm } from '@/dashboard/forms/TestimonialForm'
export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">New Testimonials</h1></div>
      <TestimonialForm />
    </div>
  )
}