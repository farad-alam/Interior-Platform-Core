'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTrustFeatureAction, updateTrustFeatureAction } from '@/core/actions/trust.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function TrustFeatureForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    titleAr: initialData?.titleAr ?? '',
    description: initialData?.description ?? '',
    descriptionAr: initialData?.descriptionAr ?? '',
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
        const res = await updateTrustFeatureAction(initialData.id, formData)
        if (res.success) { toast.success('Updated successfully'); router.push('/dashboard/trust-features'); router.refresh() } 
        else { toast.error(res.error) }
      } else {
        const res = await createTrustFeatureAction(formData)
        if (res.success) { toast.success('Created successfully'); router.push('/dashboard/trust-features'); router.refresh() } 
        else { toast.error(res.error) }
      }
    } catch(err) { toast.error('Error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader><CardTitle>Trust Features Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 col-span-1"><Label htmlFor="title">Title (EN)</Label><Input type="text" id="title" name="title" value={formData.title} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="titleAr">Title (AR)</Label><Input type="text" id="titleAr" name="titleAr" value={formData.titleAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="description">Description (EN)</Label><Textarea id="description" name="description" value={formData.description} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="descriptionAr">Description (AR)</Label><Textarea id="descriptionAr" name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="icon">Icon (lucide)</Label><Input type="text" id="icon" name="icon" value={formData.icon} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="order">Order</Label><Input type="number" id="order" name="order" value={formData.order} onChange={handleChange} dir="ltr" /></div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/trust-features')} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}