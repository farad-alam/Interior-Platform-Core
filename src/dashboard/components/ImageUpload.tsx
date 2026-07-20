'use client'

import { useState, useCallback } from 'react'
import { UploadCloud, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Image from 'next/image'

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void
  disabled?: boolean
}

export function ImageUpload({ onUploadSuccess, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleUpload = async (file: File) => {
    if (!file.type.includes('image')) {
      toast.error('Please upload an image file')
      return
    }

    setIsUploading(true)
    
    // Create preview instantly
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success && data.media?.url) {
        toast.success('Image uploaded successfully')
        onUploadSuccess(data.media.url)
        setPreviewUrl(data.media.url) // Update preview with real URL
      } else {
        toast.error(data.error || 'Failed to upload image')
        setPreviewUrl(null)
      }
    } catch (error) {
      toast.error('An error occurred during upload')
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  const onDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0])
    }
  }

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
          <div className="absolute top-2 right-2">
            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              onClick={() => setPreviewUrl(null)}
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div 
          className={`relative w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${dragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:bg-muted/50'}`}
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
          onDrop={onDrop}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            onChange={handleChange}
            disabled={disabled || isUploading}
          />
          <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium text-muted-foreground">
            Drag & drop an image here, or click to select
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supports JPG, PNG and WebP
          </p>
        </div>
      )}
    </div>
  )
}
