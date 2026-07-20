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

export function SettingsForm({ initialData }: { initialData: Prisma.SiteSettingsGetPayload<{}> | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    brandName: initialData?.brandName ?? '',
    phone: initialData?.phone ?? '',
    whatsapp: initialData?.whatsapp ?? '',
    email: initialData?.email ?? '',
    address: initialData?.address ?? '',
    instagram: initialData?.instagram ?? '',
    facebook: initialData?.facebook ?? '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const res = await updateSettingsAction(initialData.id, formData)
    
    if (res.success) {
      toast.success('Settings updated successfully.')
      router.refresh()
    } else {
      toast.error(res.error || 'Failed to update settings.')
    }
    
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
        <CardDescription>
          Update your agency contact information and social links. These details will reflect across the website.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input id="brandName" name="brandName" value={formData.brandName} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Physical Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input id="instagram" name="instagram" type="url" value={formData.instagram} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input id="facebook" name="facebook" type="url" value={formData.facebook} onChange={handleChange} />
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
