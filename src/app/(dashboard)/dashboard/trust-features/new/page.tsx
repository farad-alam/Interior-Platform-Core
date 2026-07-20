import { TrustFeatureForm } from '@/dashboard/forms/TrustFeatureForm'
export default function NewTrustFeaturePage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">New Trust Features</h1></div>
      <TrustFeatureForm />
    </div>
  )
}