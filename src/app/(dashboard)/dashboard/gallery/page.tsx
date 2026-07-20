import { getGalleryAction, deleteGalleryItemAction } from '@/core/actions/gallery.actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/dashboard/components/DeleteButton'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const items = await getGalleryAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">Manage your gallery images.</p>
        </div>
        <Link href="/dashboard/gallery/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" /> Add Image
        </Link>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead><TableHead>ServiceType</TableHead><TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-6">No images found.</TableCell></TableRow>
            ) : items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image src={item.imageUrl} alt={item.title || 'Image'} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell>{String(item.title || '')}</TableCell><TableCell>{String(item.serviceType || '')}</TableCell><TableCell>{String(item.status || '')}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/dashboard/gallery/${item.id}`} className={buttonVariants({ variant: 'outline', size: 'icon' })}><Edit className="h-4 w-4" /></Link>
                  <DeleteButton id={item.id} action={deleteGalleryItemAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}