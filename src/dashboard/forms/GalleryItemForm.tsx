'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createGalleryItemAction, updateGalleryItemAction } from '@/core/actions/gallery.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ImageUpload } from '@/dashboard/components/ImageUpload'
import Image from 'next/image'
import { X } from 'lucide-react'

export function GalleryItemForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.imageUrl || null)
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(initialData?.beforeImageUrl || null)
  
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    titleAr: initialData?.titleAr ?? '',
    caption: initialData?.caption ?? '',
    captionAr: initialData?.captionAr ?? '',
    serviceType: initialData?.serviceType ?? '',
    status: initialData?.status ?? 'DRAFT',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl) return toast.error('Please upload an After image')
    setLoading(true)
    
    const data = { ...formData, imageUrl, beforeImageUrl }
    
    try {
      if (initialData?.id) {
        const res = await updateGalleryItemAction(initialData.id, data)
        if (res.success) { toast.success('Updated successfully'); router.push('/dashboard/gallery'); router.refresh() } 
        else { toast.error(res.error) }
      } else {
        const res = await createGalleryItemAction(data)
        if (res.success) { toast.success('Created successfully'); router.push('/dashboard/gallery'); router.refresh() } 
        else { toast.error(res.error) }
      }
    } catch(err) { toast.error('Error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader><CardTitle>Gallery Details</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Before Image (Optional)</Label>
              {beforeImageUrl ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                  <Image src={beforeImageUrl} alt="Before Preview" fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Button type="button" variant="destructive" size="icon" onClick={() => setBeforeImageUrl(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <ImageUpload 
                  onUploadSuccess={(url) => setBeforeImageUrl(url)}
                  disabled={loading}
                />
              )}
            </div>

            <div className="space-y-4">
              <Label>After Image (Primary)</Label>
              {imageUrl ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                  <Image src={imageUrl} alt="After Preview" fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Button type="button" variant="destructive" size="icon" onClick={() => setImageUrl(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <ImageUpload 
                  onUploadSuccess={(url) => setImageUrl(url)}
                  disabled={loading}
                />
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (EN)</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleAr">Title (AR)</Label>
              <Input id="titleAr" name="titleAr" value={formData.titleAr} onChange={handleChange} dir="rtl" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="caption">Caption (EN)</Label>
              <Textarea id="caption" name="caption" value={formData.caption} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="captionAr">Caption (AR)</Label>
              <Textarea id="captionAr" name="captionAr" value={formData.captionAr} onChange={handleChange} dir="rtl" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type Filter</Label>
              <Select value={formData.serviceType} onValueChange={(v) => setFormData({...formData, serviceType: v})}>
                <SelectTrigger><SelectValue placeholder="Select Service" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance (صيانة)</SelectItem>
                  <SelectItem value="installation">Installation (تركيب)</SelectItem>
                  <SelectItem value="dismantling">Dismantling (فك)</SelectItem>
                  <SelectItem value="other">Other (أخرى)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/gallery')} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}