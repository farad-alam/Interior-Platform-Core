'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ClientGallery({ items, isAr }: { items: any[], isAr: boolean }) {
  const [filter, setFilter] = useState('ALL')

  const filteredItems = filter === 'ALL' 
    ? items 
    : items.filter(item => item.serviceType.toLowerCase() === filter.toLowerCase())

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          onClick={() => setFilter('ALL')}
          className={`px-6 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${filter === 'ALL' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
        >
          {isAr ? 'الكل' : 'All'}
        </button>
        <button 
          onClick={() => setFilter('MAINTENANCE')}
          className={`px-6 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${filter === 'MAINTENANCE' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
        >
          {isAr ? 'صيانة' : 'Maintenance'}
        </button>
        <button 
          onClick={() => setFilter('INSTALLATION')}
          className={`px-6 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${filter === 'INSTALLATION' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
        >
          {isAr ? 'تركيب' : 'Installation'}
        </button>
        <button 
          onClick={() => setFilter('DISMANTLING')}
          className={`px-6 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${filter === 'DISMANTLING' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
        >
          {isAr ? 'فك' : 'Dismantling'}
        </button>
        <button 
          onClick={() => setFilter('OTHER')}
          className={`px-6 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${filter === 'OTHER' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
        >
          {isAr ? 'أخرى' : 'Other'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image src={item.imageUrl} alt={item.title || 'Portfolio Image'} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <h4 className="font-bold text-lg">{isAr ? (item.titleAr || item.title) : item.title}</h4>
              <p className="text-sm text-white/80">{isAr ? (item.captionAr || item.caption) : item.caption}</p>
              <span className="inline-block mt-3 text-xs font-bold uppercase tracking-wider text-primary">
                {item.serviceType}
              </span>
            </div>
          </div>
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          {isAr ? 'لا توجد صور.' : 'No images found for this category.'}
        </div>
      )}
    </>
  )
}
