import { StatForm } from '@/dashboard/forms/StatForm'
import { getStatByIdAction } from '@/core/actions/stat.actions'
import { notFound } from 'next/navigation'

export default async function EditStatPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const item = await getStatByIdAction(id)
  if (!item) notFound()
  
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Edit Stats Counters</h1></div>
      <StatForm initialData={item} />
    </div>
  )
}