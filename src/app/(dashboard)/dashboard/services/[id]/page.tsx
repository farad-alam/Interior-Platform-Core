import { ServiceForm } from '@/dashboard/forms/ServiceForm'
import { getServiceById } from '@/core/services/service.service'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getServiceById(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
        <p className="text-muted-foreground">
          Update the details of your service offering.
        </p>
      </div>

      <ServiceForm initialData={service} />
    </div>
  )
}
