import { v2 as cloudinary } from 'cloudinary'

// Ensure we only configure Cloudinary once in development
const globalForCloudinary = globalThis as unknown as { cloudinary: typeof cloudinary }

export const cloudinaryConfig = globalForCloudinary.cloudinary || cloudinary

if (process.env.CLOUDINARY_URL) {
  cloudinaryConfig.config({
    secure: true,
  })
}

if (process.env.NODE_ENV !== 'production') globalForCloudinary.cloudinary = cloudinaryConfig
