'use client'

import { useState } from 'react'
import Image from 'next/image'

import { BeforeAfterSlider } from './BeforeAfterSlider'

export function ClientGallery({ items, isAr }: { items: any[], isAr: boolean }) {
  const [filter, setFilter] = useState('ALL')

  const filteredItems = filter === 'ALL' 
    ? items 
    : items.filter(item => item.serviceType?.toLowerCase() === filter.toLowerCase())

  // Categories definition
  const categories = [
    { id: 'ALL', en: 'All', ar: 'الكل' },
    { id: 'MAINTENANCE', en: 'Maintenance', ar: 'صيانة' },
    { id: 'INSTALLATION', en: 'Installation', ar: 'تركيب' },
    { id: 'DISMANTLING', en: 'Dismantling', ar: 'فك' },
    { id: 'OTHER', en: 'Other', ar: 'أخرى' }
  ]

  return (
    <>
      <div className={`flex flex-wrap items-center gap-3 mb-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
        {categories.map(cat => {
          const isActive = filter === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? 'bg-[#2C3B2D] text-[#F5F0E8]'
                  : 'bg-transparent border border-[#2C3B2D]/20 text-[#8C7B6B] hover:border-[#2C3B2D] hover:text-[#2C3B2D]'
              }`}
            >
              {isAr ? cat.ar : cat.en}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          if (item.beforeImageUrl) {
            return (
              <BeforeAfterSlider
                key={item.id}
                beforeImage={item.beforeImageUrl}
                afterImage={item.imageUrl}
                title={item.title || 'Portfolio Image'}
                titleAr={item.titleAr}
                caption={item.caption || ''}
                captionAr={item.captionAr}
                serviceType={item.serviceType || 'OTHER'}
                isAr={isAr}
              />
            )
          }

          return (
            <div
              key={item.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ background: '#EDE8DD' }}
            >
              <Image
                src={item.imageUrl}
                alt={item.title || 'Portfolio Image'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/80 via-[#1E1E1E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                <h4 className="font-playfair font-bold text-2xl mb-2">
                  {isAr ? (item.titleAr || item.title) : item.title}
                </h4>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {isAr ? (item.captionAr || item.caption) : item.caption}
                </p>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#D4B896' }}
                >
                  {item.serviceType}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-16" style={{ color: '#8C7B6B' }}>
          {isAr ? 'لا توجد صور في هذا القسم.' : 'No images found for this category.'}
        </div>
      )}
    </>
  )
}
