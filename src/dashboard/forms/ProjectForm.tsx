'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProjectAction, updateProjectAction } from '@/core/actions/project.actions'
import { Prisma } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ImageUpload } from '@/dashboard/components/ImageUpload'
import Image from 'next/image'
import { X } from 'lucide-react'

type ProjectWithCategory = Prisma.ProjectGetPayload<{
  include: { category: true }
}>

interface ProjectFormProps {
  initialData?: ProjectWithCategory | null
  categories: Prisma.CategoryGetPayload<{}>[]
}

export function ProjectForm({ initialData, categories }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    categoryId: initialData?.categoryId ?? '',
    status: initialData?.status ?? 'DRAFT',
    featured: initialData?.featured ?? false,
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

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, i) => i !== indexToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      ...formData,
      categoryId: formData.categoryId || null, // handle empty select
      images
    }

    try {
      if (initialData?.id) {
        const res = await updateProjectAction(initialData.id, data as any)
        if (res.success) {
          toast.success('Project updated successfully.')
          router.push('/dashboard/projects')
          router.refresh()
        } else {
          toast.error(res.error || 'Failed to update project.')
        }
      } else {
        const res = await createProjectAction(data as any)
        if (res.success) {
          toast.success('Project created successfully.')
          router.push('/dashboard/projects')
          router.refresh()
        } else {
          toast.error(res.error || 'Failed to create project.')
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
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={handleTitleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input id="slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={4}
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.categoryId} onValueChange={(val) => setFormData({...formData, categoryId: val === 'none' ? '' : (val || '')})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {categories.filter(c => c.type === 'project').map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="featured" 
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({...formData, featured: checked as boolean})}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Feature this project on the homepage
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                <Image src={url} alt={`Project image ${i+1}`} fill className="object-cover" />
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => handleRemoveImage(i)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <ImageUpload 
            onUploadSuccess={(url) => setImages([...images, url])} 
            disabled={loading}
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/projects')} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (initialData ? 'Update Project' : 'Create Project')}
        </Button>
      </div>
    </form>
  )
}
