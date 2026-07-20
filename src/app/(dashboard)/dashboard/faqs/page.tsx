import { getFaqsAction } from '@/core/actions/faq.actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/dashboard/components/DeleteButton'
import { deleteFaqAction } from '@/core/actions/faq.actions'

export const dynamic = 'force-dynamic'

export default async function FaqsPage() {
  const items = await getFaqsAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
          <p className="text-muted-foreground">Manage your faqs.</p>
        </div>
        <Link href="/dashboard/faqs/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" /> New
        </Link>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead><TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center py-6">No records found.</TableCell></TableRow>
            ) : items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{String(item.question)}</TableCell><TableCell>{String(item.status)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/dashboard/faqs/${item.id}`} className={buttonVariants({ variant: 'outline', size: 'icon' })}><Edit className="h-4 w-4" /></Link>
                  <DeleteButton id={item.id} action={deleteFaqAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}