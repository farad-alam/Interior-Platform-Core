'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createFaqAction, updateFaqAction } from '@/core/actions/faq.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function FaqForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    question: initialData?.question ?? '',
    questionAr: initialData?.questionAr ?? '',
    answer: initialData?.answer ?? '',
    answerAr: initialData?.answerAr ?? '',
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
        const res = await updateFaqAction(initialData.id, formData)
        if (res.success) { toast.success('Updated successfully'); router.push('/dashboard/faqs'); router.refresh() } 
        else { toast.error(res.error) }
      } else {
        const res = await createFaqAction(formData)
        if (res.success) { toast.success('Created successfully'); router.push('/dashboard/faqs'); router.refresh() } 
        else { toast.error(res.error) }
      }
    } catch(err) { toast.error('Error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader><CardTitle>FAQs Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 col-span-1"><Label htmlFor="question">Question (EN)</Label><Input type="text" id="question" name="question" value={formData.question} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="questionAr">Question (AR)</Label><Input type="text" id="questionAr" name="questionAr" value={formData.questionAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="answer">Answer (EN)</Label><Textarea id="answer" name="answer" value={formData.answer} onChange={handleChange} dir="ltr" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="answerAr">Answer (AR)</Label><Textarea id="answerAr" name="answerAr" value={formData.answerAr} onChange={handleChange} dir="rtl" /></div>
          <div className="space-y-2 col-span-1"><Label htmlFor="status">Status</Label><Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="DRAFT">Draft</SelectItem><SelectItem value="PUBLISHED">Published</SelectItem></SelectContent></Select></div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/faqs')} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}