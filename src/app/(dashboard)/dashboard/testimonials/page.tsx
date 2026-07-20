import { getTestimonialsAction } from '@/core/actions/testimonial.actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/dashboard/components/DeleteButton'
import { deleteTestimonialAction } from '@/core/actions/testimonial.actions'

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  const items = await getTestimonialsAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">Manage your testimonials.</p>
        </div>
        <Link href="/dashboard/testimonials/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" /> New
        </Link>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ClientName</TableHead><TableHead>Rating</TableHead><TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-6">No records found.</TableCell></TableRow>
            ) : items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{String(item.clientName)}</TableCell><TableCell>{String(item.rating)}</TableCell><TableCell>{String(item.status)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/dashboard/testimonials/${item.id}`} className={buttonVariants({ variant: 'outline', size: 'icon' })}><Edit className="h-4 w-4" /></Link>
                  <DeleteButton id={item.id} action={deleteTestimonialAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}