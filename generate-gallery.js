const fs = require('fs')
const path = require('path')

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const models = [
  {
    name: 'galleryItem',
    modelName: 'GalleryItem',
    plural: 'gallery',
    title: 'Gallery',
    columns: ['title', 'serviceType', 'status'],
    fields: [
      { name: 'title', type: 'text', label: 'Title (EN)' },
      { name: 'titleAr', type: 'text', label: 'Title (AR)' },
      { name: 'caption', type: 'textarea', label: 'Caption (EN)' },
      { name: 'captionAr', type: 'textarea', label: 'Caption (AR)' },
      { name: 'imageUrl', type: 'text', label: 'Image URL' },
      { name: 'serviceType', type: 'selectService', label: 'Service Type' },
      { name: 'status', type: 'select', label: 'Status' }
    ]
  }
]

models.forEach((m) => {
  const dirPath = path.join(__dirname, `src/app/(dashboard)/dashboard/${m.plural}`)
  fs.mkdirSync(path.join(dirPath, 'new'), { recursive: true })
  fs.mkdirSync(path.join(dirPath, '[id]'), { recursive: true })
  
  // 1. Index Page
  const indexCode = `import { getGalleryAction, deleteGalleryItemAction } from '@/core/actions/gallery.actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/dashboard/components/DeleteButton'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function ${capitalize(m.title)}Page() {
  const items = await getGalleryAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">${m.title}</h1>
          <p className="text-muted-foreground">Manage your ${m.title.toLowerCase()} images.</p>
        </div>
        <Link href="/dashboard/${m.plural}/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" /> Add Image
        </Link>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              ${m.columns.map(c => `<TableHead>${capitalize(c)}</TableHead>`).join('')}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={${m.columns.length + 2}} className="text-center py-6">No images found.</TableCell></TableRow>
            ) : items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image src={item.imageUrl} alt={item.title || 'Image'} fill className="object-cover" />
                  </div>
                </TableCell>
                ${m.columns.map(c => `<TableCell>{String(item.${c} || '')}</TableCell>`).join('')}
                <TableCell className="text-right space-x-2">
                  <Link href={\`/dashboard/${m.plural}/\${item.id}\`} className={buttonVariants({ variant: 'outline', size: 'icon' })}><Edit className="h-4 w-4" /></Link>
                  <DeleteButton id={item.id} action={deleteGalleryItemAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), indexCode)

  // 2. New Page
  const newCode = `import { ${capitalize(m.modelName)}Form } from '@/dashboard/forms/${capitalize(m.modelName)}Form'
export default function New${capitalize(m.modelName)}Page() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">New ${m.title} Image</h1></div>
      <${capitalize(m.modelName)}Form />
    </div>
  )
}`
  fs.writeFileSync(path.join(dirPath, 'new/page.tsx'), newCode)

  // 3. Edit Page
  const editCode = `import { ${capitalize(m.modelName)}Form } from '@/dashboard/forms/${capitalize(m.modelName)}Form'
import { getGalleryItemByIdAction } from '@/core/actions/gallery.actions'
import { notFound } from 'next/navigation'

export default async function Edit${capitalize(m.modelName)}Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const item = await getGalleryItemByIdAction(id)
  if (!item) notFound()
  
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Edit ${m.title} Image</h1></div>
      <${capitalize(m.modelName)}Form initialData={item} />
    </div>
  )
}`
  fs.writeFileSync(path.join(dirPath, '[id]/page.tsx'), editCode)

  // 4. Form
  const formCode = `'use client'
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

export function ${capitalize(m.modelName)}Form({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.imageUrl || null)
  
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
    if (!imageUrl) return toast.error('Please upload an image')
    setLoading(true)
    
    const data = { ...formData, imageUrl }
    
    try {
      if (initialData?.id) {
        const res = await updateGalleryItemAction(initialData.id, data)
        if (res.success) { toast.success('Updated successfully'); router.push('/dashboard/${m.plural}'); router.refresh() } 
        else { toast.error(res.error) }
      } else {
        const res = await createGalleryItemAction(data)
        if (res.success) { toast.success('Created successfully'); router.push('/dashboard/${m.plural}'); router.refresh() } 
        else { toast.error(res.error) }
      }
    } catch(err) { toast.error('Error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader><CardTitle>${m.title} Details</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Image</Label>
            <ImageUpload 
              value={imageUrl ? [imageUrl] : []}
              onChange={(urls) => setImageUrl(urls[0])}
              onRemove={() => setImageUrl(null)}
            />
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
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/${m.plural}')} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}`
  fs.writeFileSync(path.join(__dirname, `src/dashboard/forms/${capitalize(m.modelName)}Form.tsx`), formCode)
})
