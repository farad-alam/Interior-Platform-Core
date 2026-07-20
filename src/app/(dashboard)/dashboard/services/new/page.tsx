import { ServiceForm } from '@/dashboard/forms/ServiceForm'

export const dynamic = 'force-dynamic'

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Service</h1>
        <p className="text-muted-foreground">
          Add a new service offering to your agency.
        </p>
      </div>

      <ServiceForm />
    </div>
  )
}
