import { StatForm } from '@/dashboard/forms/StatForm'
export default function NewStatPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">New Stats Counters</h1></div>
      <StatForm />
    </div>
  )
}