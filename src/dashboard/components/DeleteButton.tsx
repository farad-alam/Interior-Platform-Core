'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  action: (id: string) => Promise<{ success: boolean; error?: string }>
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return
    }

    setLoading(true)
    const res = await action(id)
    
    if (res.success) {
      toast.success('Item deleted successfully')
      router.refresh()
    } else {
      toast.error(res.error || 'Failed to delete item')
    }
    
    setLoading(false)
  }

  return (
    <Button 
      variant="destructive" 
      size="icon" 
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
