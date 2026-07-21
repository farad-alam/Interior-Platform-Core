'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateSettingsAction } from '@/core/actions/settings.actions'
import { Prisma } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ImageUpload } from '@/dashboard/components/ImageUpload'
import Image from 'next/image'
import { X } from 'lucide-react'

export function SettingsForm({ initialData }: { initialData: Prisma.SiteSettingsGetPayload<{}> | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Convert legacy single string to array for backward compatibility
  const initialHeroImages = initialData?.heroImages?.length 
    ? initialData.heroImages 
    : (initialData as any)?.heroImage 
      ? [(initialData as any).heroImage] 
      : []
      
  const [heroImages, setHeroImages] = useState<string[]>(initialHeroImages)
  
  const [formData, setFormData] = useState({
    brandName: initialData?.brandName ?? '',
    brandNameAr: initialData?.brandNameAr ?? '',
    phone: initialData?.phone ?? '',
    whatsapp: initialData?.whatsapp ?? '',
    email: initialData?.email ?? '',
    address: initialData?.address ?? '',
    addressAr: initialData?.addressAr ?? '',
    instagram: initialData?.instagram ?? '',
    facebook: initialData?.facebook ?? '',
    heroHeadline: initialData?.heroHeadline ?? '',
    heroHeadlineAr: initialData?.heroHeadlineAr ?? '',
    heroSubheadline: initialData?.heroSubheadline ?? '',
    heroSubheadlineAr: initialData?.heroSubheadlineAr ?? '',
    workingHours: initialData?.workingHours ?? '',
    workingHoursAr: initialData?.workingHoursAr ?? '',
    mapEmbedUrl: initialData?.mapEmbedUrl ?? '',
    serviceAreas: initialData?.serviceAreas ?? '',
    serviceAreasAr: initialData?.serviceAreasAr ?? '',
    footerTagline: initialData?.footerTagline ?? '',
    footerTaglineAr: initialData?.footerTaglineAr ?? '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!initialData?.id) {
      toast.error('Settings record not found. Please create one manually in DB first.')
      setLoading(false)
      return
    }

    const dataToSubmit = { ...formData, heroImages }

    const res = await updateSettingsAction(initialData.id, dataToSubmit)
    
    if (res.success) {
      toast.success('Settings updated successfully.')
      router.refresh()
    } else {
      toast.error(res.error || 'Failed to update settings.')
    }
    
    setLoading(false)
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
        <CardDescription>
          Update your agency contact information, hero section, and social links.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8">
          
          {/* General Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name (EN)</Label>
                <Input id="brandName" name="brandName" value={formData.brandName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brandNameAr" className="text-right block">اسم العلامة التجارية (AR)</Label>
                <Input id="brandNameAr" name="brandNameAr" value={formData.brandNameAr} onChange={handleChange} dir="rtl" />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Hero Section</h3>
            
            <div className="space-y-4 mb-6 p-4 rounded-xl border bg-gray-50/50">
              <Label className="text-base font-semibold">Hero Background Images (Up to 3)</Label>
              <p className="text-sm text-gray-500 mb-4">
                These images will automatically slide in the hero section. We recommend using 16:9 high-resolution images.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0, 1, 2].map((index) => {
                  const url = heroImages[index]
                  return (
                    <div key={index} className="space-y-2">
                      <Label className="text-xs text-gray-500 uppercase">Image {index + 1}</Label>
                      {url ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                          <Image src={url} alt={`Hero ${index + 1}`} fill className="object-cover" />
                          <div className="absolute top-2 right-2">
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="icon" 
                              onClick={() => {
                                const newImages = [...heroImages]
                                newImages.splice(index, 1)
                                setHeroImages(newImages.filter(Boolean))
                              }}
                              disabled={loading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <ImageUpload
                          onUploadSuccess={(newUrl) => {
                            const newImages = [...heroImages]
                            newImages[index] = newUrl
                            setHeroImages(newImages.filter(Boolean))
                          }}
                          disabled={loading}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroHeadline">Hero Headline (EN)</Label>
                <Input id="heroHeadline" name="heroHeadline" value={formData.heroHeadline} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroHeadlineAr" className="text-right block">العنوان الرئيسي (AR)</Label>
                <Input id="heroHeadlineAr" name="heroHeadlineAr" value={formData.heroHeadlineAr} onChange={handleChange} dir="rtl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubheadline">Hero Subheadline (EN)</Label>
                <Input id="heroSubheadline" name="heroSubheadline" value={formData.heroSubheadline} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubheadlineAr" className="text-right block">العنوان الفرعي (AR)</Label>
                <Input id="heroSubheadlineAr" name="heroSubheadlineAr" value={formData.heroSubheadlineAr} onChange={handleChange} dir="rtl" />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mapEmbedUrl">Google Maps Embed URL</Label>
                <Input id="mapEmbedUrl" name="mapEmbedUrl" value={formData.mapEmbedUrl} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address (EN)</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressAr" className="text-right block">العنوان (AR)</Label>
                <Input id="addressAr" name="addressAr" value={formData.addressAr} onChange={handleChange} dir="rtl" />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Footer & Service Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours (EN)</Label>
                <Input id="workingHours" name="workingHours" value={formData.workingHours} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHoursAr" className="text-right block">ساعات العمل (AR)</Label>
                <Input id="workingHoursAr" name="workingHoursAr" value={formData.workingHoursAr} onChange={handleChange} dir="rtl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceAreas">Service Areas (EN)</Label>
                <Input id="serviceAreas" name="serviceAreas" value={formData.serviceAreas} onChange={handleChange} placeholder="e.g. Al Olaya, Al Malaz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceAreasAr" className="text-right block">مناطق الخدمة (AR)</Label>
                <Input id="serviceAreasAr" name="serviceAreasAr" value={formData.serviceAreasAr} onChange={handleChange} dir="rtl" />
              </div>
            </div>
          </div>

        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
