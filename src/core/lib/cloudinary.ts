import { v2 as cloudinary } from 'cloudinary'

// Ensure we only configure Cloudinary once in development
const globalForCloudinary = globalThis as unknown as { cloudinary: typeof cloudinary }

export const cloudinaryConfig = globalForCloudinary.cloudinary || cloudinary

cloudinaryConfig.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

if (process.env.NODE_ENV !== 'production') globalForCloudinary.cloudinary = cloudinaryConfig
