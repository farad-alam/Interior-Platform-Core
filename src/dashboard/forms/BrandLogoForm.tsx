'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrandLogoAction, updateBrandLogoAction } from '@/core/actions/brand.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { ImageUpload } from '@/dashboard/components/ImageUpload'

export function BrandLogoForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (!imageUrl) {
      toast.error('Please upload an image')
      return
    }

    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      nameAr: formData.get('nameAr'),
      imageUrl,
      url: formData.get('url'),
      status: formData.get('status'),
      order: formData.get('order'),
    }

    try {
      const res = initialData
        ? await updateBrandLogoAction(initialData.id, data)
        : await createBrandLogoAction(data)

      if (res.success) {
        toast.success(initialData ? 'Brand updated' : 'Brand added')
        router.push('/dashboard/brands')
      } else {
        toast.error(res.error || 'Something went wrong')
      }
    } catch (err) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialData ? 'Edit Brand Logo' : 'Add Brand Logo'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <Label>Logo Image</Label>
              {imageUrl ? (
                <div className="relative w-48 h-32 border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img src={imageUrl} alt="Brand Logo" className="max-w-full max-h-full object-contain p-4" />
                  <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => setImageUrl('')}>
                    Remove
                  </Button>
                </div>
              ) : (
                <ImageUpload onUploadSuccess={(url) => setImageUrl(url)} />
              )}
              <p className="text-xs text-muted-foreground">For best results, use a PNG with a transparent background.</p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label>Brand Name (EN)</Label>
              <Input name="name" defaultValue={initialData?.name} required />
            </div>
            <div className="space-y-2">
              <Label>Brand Name (AR)</Label>
              <Input name="nameAr" defaultValue={initialData?.nameAr} dir="rtl" />
            </div>

            {/* URL */}
            <div className="space-y-2 md:col-span-2">
              <Label>Website URL (Optional)</Label>
              <Input type="url" name="url" defaultValue={initialData?.url} placeholder="https://..." />
            </div>

            {/* Order & Status */}
            <div className="space-y-2">
              <Label>Order (for sorting)</Label>
              <Input type="number" name="order" defaultValue={initialData?.order || 0} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select name="status" defaultValue={initialData?.status || 'PUBLISHED'}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push('/dashboard/brands')} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Brand'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
