'use server'

import { revalidatePath } from 'next/cache'
import { deleteMedia, getMediaById } from '@/core/services/media.service'
import { cloudinaryConfig } from '@/core/lib/cloudinary'

export const deleteMediaAction = async (id: string) => {
  try {
    const media = await getMediaById(id)
    if (!media) {
      return { success: false, error: 'Media not found' }
    }

    // Delete from Cloudinary using the public_id
    if (media.publicId) {
      await cloudinaryConfig.uploader.destroy(media.publicId)
    }

    // Delete from DB
    await deleteMedia(id)
    
    revalidatePath('/dashboard/media')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete media' }
  }
}
