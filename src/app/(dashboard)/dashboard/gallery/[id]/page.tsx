import { GalleryItemForm } from '@/dashboard/forms/GalleryItemForm'
import { getGalleryItemByIdAction } from '@/core/actions/gallery.actions'
import { notFound } from 'next/navigation'

export default async function EditGalleryItemPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const item = await getGalleryItemByIdAction(id)
  if (!item) notFound()
  
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Edit Gallery Image</h1></div>
      <GalleryItemForm initialData={item} />
    </div>
  )
}