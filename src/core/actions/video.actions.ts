'use server'

import { prisma } from '@/core/db/client'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { extractYouTubeId } from '@/core/utils/video'

export async function getVideoReelsAction() {
  try {
    const videos = await prisma.videoReel.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return videos
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export async function getPublishedVideoReelsAction() {
  try {
    const videos = await prisma.videoReel.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return videos
  } catch (error) {
    console.error('Error fetching published videos:', error)
    return []
  }
}

export async function getVideoReelAction(id: string) {
  try {
    const video = await prisma.videoReel.findUnique({
      where: { id }
    })
    return video
  } catch (error) {
    console.error('Error fetching video:', error)
    return null
  }
}

export async function createVideoReelAction(data: any) {
  try {
    const videoId = extractYouTubeId(data.youtubeUrl)
    if (!videoId) {
      return { success: false, error: 'Invalid YouTube URL' }
    }

    const video = await prisma.videoReel.create({
      data: {
        title: data.title,
        titleAr: data.titleAr,
        caption: data.caption,
        captionAr: data.captionAr,
        youtubeUrl: data.youtubeUrl,
        videoId: videoId,
        category: data.category || 'OTHER',
        status: data.status || 'DRAFT',
        featured: data.featured || false,
        order: data.order ? parseInt(data.order) : 0,
      }
    })

    revalidatePath('/')
    revalidatePath('/dashboard/videos')
    return { success: true, data: video }
  } catch (error: any) {
    console.error('Error creating video:', error)
    return { success: false, error: error.message }
  }
}

export async function updateVideoReelAction(id: string, data: any) {
  try {
    let videoId = data.videoId
    if (data.youtubeUrl) {
      const extractedId = extractYouTubeId(data.youtubeUrl)
      if (extractedId) {
        videoId = extractedId
      } else {
        return { success: false, error: 'Invalid YouTube URL' }
      }
    }

    const video = await prisma.videoReel.update({
      where: { id },
      data: {
        title: data.title,
        titleAr: data.titleAr,
        caption: data.caption,
        captionAr: data.captionAr,
        youtubeUrl: data.youtubeUrl,
        videoId: videoId,
        category: data.category,
        status: data.status,
        featured: data.featured,
        order: data.order !== undefined ? parseInt(data.order) : undefined,
      }
    })

    revalidatePath('/')
    revalidatePath('/dashboard/videos')
    return { success: true, data: video }
  } catch (error: any) {
    console.error('Error updating video:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteVideoReelAction(id: string) {
  try {
    await prisma.videoReel.delete({
      where: { id }
    })
    
    revalidatePath('/')
    revalidatePath('/dashboard/videos')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting video:', error)
    return { success: false, error: error.message }
  }
}
