import { FaqForm } from '@/dashboard/forms/FaqForm'
import { getFaqByIdAction } from '@/core/actions/faq.actions'
import { notFound } from 'next/navigation'

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const item = await getFaqByIdAction(id)
  if (!item) notFound()
  
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Edit FAQs</h1></div>
      <FaqForm initialData={item} />
    </div>
  )
}