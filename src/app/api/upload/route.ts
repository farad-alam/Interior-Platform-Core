import { NextRequest, NextResponse } from 'next/server'
import { cloudinaryConfig } from '@/core/lib/cloudinary'
import { createMedia } from '@/core/services/media.service'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary using a stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinaryConfig.uploader.upload_stream(
        { folder: 'agency-platform' },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )
      uploadStream.end(buffer)
    }) as any

    const media = await createMedia({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      filename: file.name,
      mimeType: file.type,
      size: uploadResult.bytes,
    })

    return NextResponse.json({ success: true, media })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
