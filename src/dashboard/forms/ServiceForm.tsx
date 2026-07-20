'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createServiceAction, updateServiceAction } from '@/core/actions/service.actions'
import { Prisma } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ImageUpload } from '@/dashboard/components/ImageUpload'
import { X, Plus } from 'lucide-react'

type ServiceProps = Prisma.ServiceGetPayload<{}>

interface ServiceFormProps {
  initialData?: ServiceProps | null
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(initialData?.image || null)
  const [features, setFeatures] = useState<string[]>(initialData?.features || [''])
  const [featuresAr, setFeaturesAr] = useState<string[]>(initialData?.featuresAr || [''])
  
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    titleAr: initialData?.titleAr ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    descriptionAr: initialData?.descriptionAr ?? '',
    icon: initialData?.icon ?? '',
    whatsappMessage: initialData?.whatsappMessage ?? '',
    whatsappMessageAr: initialData?.whatsappMessageAr ?? '',
    status: initialData?.status ?? 'DRAFT',
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (!initialData) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      setFormData({ ...formData, title, slug })
    } else {
      setFormData({ ...formData, title })
    }
  }

  const handleFeatureChange = (index: number, value: string, isAr = false) => {
    if (isAr) {
      const newFeatures = [...featuresAr]
      newFeatures[index] = value
      setFeaturesAr(newFeatures)
    } else {
      const newFeatures = [...features]
      newFeatures[index] = value
      setFeatures(newFeatures)
    }
  }

  const addFeature = (isAr = false) => {
    if (isAr) setFeaturesAr([...featuresAr, ''])
    else setFeatures([...features, ''])
  }

  const removeFeature = (index: number, isAr = false) => {
    if (isAr) setFeaturesAr(featuresAr.filter((_, i) => i !== index))
    else setFeatures(features.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // filter out empty features
    const validFeatures = features.filter(f => f.trim() !== '')
    const validFeaturesAr = featuresAr.filter(f => f.trim() !== '')

    const data = {
      ...formData,
      image,
      features: validFeatures,
      featuresAr: validFeaturesAr,
    }

    try {
      if (initialData?.id) {
        const res = await updateServiceAction(initialData.id, data as any)
        if (res.success) {
          toast.success('Service updated successfully.')
          router.push('/dashboard/services')
          router.refresh()
        } else {
          toast.error(res.error || 'Failed to update service.')
        }
      } else {
        const res = await createServiceAction(data as any)
        if (res.success) {
          toast.success('Service created successfully.')
          router.push('/dashboard/services')
          router.refresh()
        } else {
          toast.error(res.error || 'Failed to create service.')
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title (EN)</Label>
              <Input id="title" value={formData.title} onChange={handleTitleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleAr" className="text-right block">عنوان الخدمة (AR)</Label>
              <Input id="titleAr" value={formData.titleAr} onChange={(e) => setFormData({...formData, titleAr: e.target.value})} dir="rtl" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug (e.g. kitchen-installation)</Label>
            <Input id="slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (EN)</Label>
              <Textarea 
                id="description" 
                rows={3}
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionAr" className="text-right block">الوصف (AR)</Label>
              <Textarea 
                id="descriptionAr" 
                rows={3}
                value={formData.descriptionAr} 
                onChange={(e) => setFormData({...formData, descriptionAr: e.target.value})} 
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappMessage">WhatsApp Pre-filled Msg (EN)</Label>
              <Input id="whatsappMessage" value={formData.whatsappMessage} onChange={(e) => setFormData({...formData, whatsappMessage: e.target.value})} placeholder="I want to book..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsappMessageAr" className="text-right block">رسالة واتساب مسبقة (AR)</Label>
              <Input id="whatsappMessageAr" value={formData.whatsappMessageAr} onChange={(e) => setFormData({...formData, whatsappMessageAr: e.target.value})} dir="rtl" placeholder="أريد طلب خدمة..." />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name (lucide-react)</Label>
              <Input id="icon" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} placeholder="e.g. Paintbrush" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: (val as any) || 'DRAFT'})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Features (English)</h4>
            {features.map((feature, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Input 
                  value={feature} 
                  onChange={(e) => handleFeatureChange(i, e.target.value, false)} 
                  placeholder="e.g. Fast response"
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeFeature(i, false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addFeature(false)}>
              <Plus className="mr-2 h-4 w-4" /> Add EN Feature
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-right">المميزات (Arabic)</h4>
            {featuresAr.map((feature, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Button type="button" variant="destructive" size="icon" onClick={() => removeFeature(i, true)}>
                  <X className="h-4 w-4" />
                </Button>
                <Input 
                  value={feature} 
                  onChange={(e) => handleFeatureChange(i, e.target.value, true)} 
                  dir="rtl"
                  placeholder="سرعة الاستجابة..."
                />
              </div>
            ))}
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={() => addFeature(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add AR Feature
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Thumbnail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <ImageUpload 
              onUploadSuccess={(url) => setImage(url)} 
              disabled={loading}
            />
          </div>
          {image && (
            <p className="text-sm text-muted-foreground mt-2 break-all">
              Current image: {image}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/services')} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (initialData ? 'Update Service' : 'Create Service')}
        </Button>
      </div>
    </form>
  )
}
