'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface VideoReelsProps {
  videos: any[]
  isAr?: boolean
  title?: string
}

export function VideoReels({ videos, isAr, title = 'Our Work in Action' }: VideoReelsProps) {
  const [activeVideo, setActiveVideo] = useState<any | null>(null)

  if (!videos || videos.length === 0) return null

  // Category translation mapping
  const categoryMap: Record<string, string> = {
    WORKING: isAr ? 'قيد العمل' : 'Working',
    COMPLETED: isAr ? 'مكتمل' : 'Completed',
    TRANSFORMATION: isAr ? 'تحول' : 'Transformation',
    INSTALLATION: isAr ? 'تركيب' : 'Installation',
    OTHER: isAr ? 'أخرى' : 'Other'
  }

  const categoryColor: Record<string, string> = {
    WORKING: 'bg-blue-500',
    COMPLETED: 'bg-sf-green',
    TRANSFORMATION: 'bg-purple-500',
    INSTALLATION: 'bg-orange-500',
    OTHER: 'bg-gray-500'
  }

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 flex items-center justify-between">
        <h2 className="text-4xl font-playfair font-bold text-sf-dark">
          {title}
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-4 px-6 pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="relative flex-none w-[280px] h-[500px] rounded-2xl overflow-hidden cursor-pointer group snap-center shadow-lg transition-transform hover:-translate-y-2 duration-300 bg-black"
            onClick={() => setActiveVideo(video)}
          >
            {/* Thumbnail */}
            <Image
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-end">
                <Badge className={`${categoryColor[video.category] || 'bg-gray-500'} text-white border-none shadow-md`}>
                  {categoryMap[video.category] || video.category}
                </Badge>
              </div>

              <div className="space-y-3">
                {/* Play Button Overlay */}
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-sf-green transition-colors duration-300 shadow-lg">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight drop-shadow-md">
                    {isAr && video.titleAr ? video.titleAr : video.title}
                  </h3>
                  {(video.caption || video.captionAr) && (
                    <p className="text-white/80 text-sm mt-1 line-clamp-1 drop-shadow-md">
                      {isAr && video.captionAr ? video.captionAr : video.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[60]"
              onClick={() => setActiveVideo(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
