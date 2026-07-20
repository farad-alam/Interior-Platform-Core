import { getMediaFiles } from '@/core/services/media.service'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  const mediaFiles = await getMediaFiles()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <p className="text-muted-foreground">
          View all images uploaded to your Cloudinary storage.
        </p>
      </div>

      {mediaFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center rounded-lg border bg-white">
          <p className="text-muted-foreground">No media files found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaFiles.map((file) => (
            <Card key={file.id} className="overflow-hidden">
              <CardContent className="p-0 relative aspect-square">
                <Image 
                  src={file.url} 
                  alt={file.publicId ?? 'Uploaded image'} 
                  fill 
                  className="object-cover"
                />
              </CardContent>
              <CardFooter className="p-2 bg-muted/50 text-xs text-muted-foreground truncate flex justify-between items-center">
                <span className="truncate w-full">{file.mimeType}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
