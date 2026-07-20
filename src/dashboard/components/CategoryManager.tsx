'use client'

import { useState } from 'react'
import { createCategoryAction, deleteCategoryAction } from '@/core/actions/category.actions'
import { Prisma } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function CategoryManager({ initialCategories }: { initialCategories: Prisma.CategoryGetPayload<{}>[] }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', slug: '', type: 'project' })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    // Auto-generate slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setFormData({ ...formData, name, slug })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await createCategoryAction(formData)
    
    if (res.success) {
      toast.success('Category created successfully.')
      setFormData({ name: '', slug: '', type: 'project' })
    } else {
      toast.error(res.error || 'Failed to create category.')
    }
    
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const res = await deleteCategoryAction(id)
      if (res.success) {
        toast.success('Category deleted.')
      } else {
        toast.error(res.error || 'Failed to delete category.')
      }
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white">
          <h3 className="font-semibold text-lg">Add New Category</h3>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={handleNameChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val || 'project'})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="gallery">Gallery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add Category'}
          </Button>
        </form>
      </div>
      
      <div className="md:col-span-2 border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              initialCategories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.slug}</TableCell>
                  <TableCell className="capitalize">{cat.type}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(cat.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
