import { FaqForm } from '@/dashboard/forms/FaqForm'
export default function NewFaqPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">New FAQs</h1></div>
      <FaqForm />
    </div>
  )
}