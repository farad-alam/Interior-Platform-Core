'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTestimonialAction, updateTestimonialAction } from '@/core/actions/testimonial.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function TestimonialForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    clientName: initialData?.clientName ?? '',
    clientNameAr: initialData?.clientNameAr ?? '',
    clientLocation: initialData?.clientLocation ?? '',
    clientLocationAr: initialData?.clientLocationAr ?? '',
    content: initialData?.content ?? '',
    contentAr: initialData?.contentAr ?? '',
    rating: initialData?.rating ?? 0,
    status: initialData?.status ?? ''
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
        const res = await updateTestimonialAction(initialData.id, formData)
        if (res.success) { toast.success('Updated successfully'); router.push('/dashboard/testimonials'); router.refresh() } 
        else { toast.error(res.error) }
      } else {
        const res = await createTestimonialAction(formData)
        if (res.success) { toast.success('Created successfully'); router.push('/dashboard/testimonials'); router.refresh() } 
        else { toast.error(res.error) }
      }
    } catch(err) { toast.error('Error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader><CardTitle>Testimonials Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 col-span-1"><Label htmlFor="clientName">Client Name (EN)</Label><Input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="clientNameAr">Client Name (AR)</Label><Input type="text" id="clientNameAr" name="clientNameAr" value={formData.clientNameAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="clientLocation">Location (EN)</Label><Input type="text" id="clientLocation" name="clientLocation" value={formData.clientLocation} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="clientLocationAr">Location (AR)</Label><Input type="text" id="clientLocationAr" name="clientLocationAr" value={formData.clientLocationAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="content">Review (EN)</Label><Textarea id="content" name="content" value={formData.content} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="contentAr">Review (AR)</Label><Textarea id="contentAr" name="contentAr" value={formData.contentAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="rating">Rating (1-5)</Label><Input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="status">Status</Label><Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="DRAFT">Draft</SelectItem><SelectItem value="PUBLISHED">Published</SelectItem></SelectContent></Select></div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/testimonials')} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}