'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createVideoReelAction, updateVideoReelAction } from '@/core/actions/video.actions'
import { extractYouTubeId } from '@/core/utils/video'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import Image from 'next/image'

export function VideoReelForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '')
  
  const videoId = extractYouTubeId(youtubeUrl)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      titleAr: formData.get('titleAr'),
      caption: formData.get('caption'),
      captionAr: formData.get('captionAr'),
      youtubeUrl: formData.get('youtubeUrl'),
      category: formData.get('category'),
      status: formData.get('status'),
      featured: formData.get('featured') === 'on',
      order: formData.get('order'),
    }

    try {
      const res = initialData
        ? await updateVideoReelAction(initialData.id, data)
        : await createVideoReelAction(data)

      if (res.success) {
        toast.success(initialData ? 'Video updated' : 'Video created')
        router.push('/dashboard/videos')
      } else {
        toast.error(res.error || 'Something went wrong')
      }
    } catch (err) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialData ? 'Edit Video Reel' : 'Add Video Reel'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* YouTube URL */}
            <div className="space-y-2 md:col-span-2">
              <Label>YouTube URL</Label>
              <Input 
                name="youtubeUrl" 
                placeholder="https://youtube.com/shorts/..." 
                required 
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Paste standard YouTube link or YouTube Shorts link.</p>
              
              {/* Preview Thumbnail */}
              {videoId && (
                <div className="mt-4">
                  <Label>Thumbnail Preview</Label>
                  <div className="relative w-32 h-56 rounded-md overflow-hidden border mt-2 bg-black">
                    <Image 
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                      alt="Thumbnail" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label>Title (EN)</Label>
              <Input name="title" defaultValue={initialData?.title} required />
            </div>
            <div className="space-y-2">
              <Label>Title (AR)</Label>
              <Input name="titleAr" defaultValue={initialData?.titleAr} dir="rtl" />
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <Label>Caption (EN)</Label>
              <Textarea name="caption" defaultValue={initialData?.caption} />
            </div>
            <div className="space-y-2">
              <Label>Caption (AR)</Label>
              <Textarea name="captionAr" defaultValue={initialData?.captionAr} dir="rtl" />
            </div>

            {/* Category & Order */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select name="category" defaultValue={initialData?.category || 'OTHER'}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="WORKING">Working (In Progress)</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="TRANSFORMATION">Transformation</SelectItem>
                  <SelectItem value="INSTALLATION">Installation</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Order (for sorting)</Label>
              <Input type="number" name="order" defaultValue={initialData?.order || 0} />
            </div>

            {/* Status & Featured */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select name="status" defaultValue={initialData?.status || 'PUBLISHED'}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mt-8">
              <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-4 h-4 rounded border-gray-300" />
              <Label htmlFor="featured">Featured Video</Label>
            </div>

          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push('/dashboard/videos')} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Video'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
