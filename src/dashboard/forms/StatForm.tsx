'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createStatAction, updateStatAction } from '@/core/actions/stat.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function StatForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    label: initialData?.label ?? '',
    labelAr: initialData?.labelAr ?? '',
    value: initialData?.value ?? '',
    valueAr: initialData?.valueAr ?? '',
    icon: initialData?.icon ?? '',
    order: initialData?.order ?? 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (initialData?.id) {
        const res = await updateStatAction(initialData.id, formData)
        if (res.success) { toast.success('Updated successfully'); router.push('/dashboard/stats'); router.refresh() } 
        else { toast.error(res.error) }
      } else {
        const res = await createStatAction(formData)
        if (res.success) { toast.success('Created successfully'); router.push('/dashboard/stats'); router.refresh() } 
        else { toast.error(res.error) }
      }
    } catch(err) { toast.error('Error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader><CardTitle>Stats Counters Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 col-span-1"><Label htmlFor="label">Label (EN)</Label><Input type="text" id="label" name="label" value={formData.label} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="labelAr">Label (AR)</Label><Input type="text" id="labelAr" name="labelAr" value={formData.labelAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="value">Value (e.g. 500+)</Label><Input type="text" id="value" name="value" value={formData.value} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="valueAr">Value (AR)</Label><Input type="text" id="valueAr" name="valueAr" value={formData.valueAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="icon">Icon (lucide)</Label><Input type="text" id="icon" name="icon" value={formData.icon} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="order">Order</Label><Input type="number" id="order" name="order" value={formData.order} onChange={handleChange} dir="ltr" /></div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/stats')} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}