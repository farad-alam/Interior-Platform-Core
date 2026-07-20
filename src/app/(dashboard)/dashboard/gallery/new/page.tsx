import { GalleryItemForm } from '@/dashboard/forms/GalleryItemForm'
export default function NewGalleryItemPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">New Gallery Image</h1></div>
      <GalleryItemForm />
    </div>
  )
}