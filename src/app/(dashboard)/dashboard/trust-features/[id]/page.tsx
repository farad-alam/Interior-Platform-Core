import { TrustFeatureForm } from '@/dashboard/forms/TrustFeatureForm'
import { getTrustFeatureByIdAction } from '@/core/actions/trust.actions'
import { notFound } from 'next/navigation'

export default async function EditTrustFeaturePage({ params }: { params: { id: string } }) {
  const { id } = await params
  const item = await getTrustFeatureByIdAction(id)
  if (!item) notFound()
  
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Edit Trust Features</h1></div>
      <TrustFeatureForm initialData={item} />
    </div>
  )
}