import { VideoReelForm } from '@/dashboard/forms/VideoReelForm'
import { getVideoReelAction } from '@/core/actions/video.actions'
import { notFound } from 'next/navigation'

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const data = await getVideoReelAction(params.id)

  if (!data) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <VideoReelForm initialData={data} />
    </div>
  )
}
