import { getBrandLogosAction, deleteBrandLogoAction } from '@/core/actions/brand.actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/dashboard/components/DeleteButton'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function BrandsPage() {
  const items = await getBrandLogosAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground">Manage brand logos for the storefront marquee.</p>
        </div>
        <Link href="/dashboard/brands/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" /> Add Brand
        </Link>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-6">No brands found.</TableCell></TableRow>
            ) : items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-16 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center p-2 border">
                    <Image src={item.imageUrl} alt={item.name || 'Logo'} fill className="object-contain" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.order}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'PUBLISHED' ? 'default' : 'secondary'}>{item.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/dashboard/brands/${item.id}`} className={buttonVariants({ variant: 'outline', size: 'icon' })}>
                    <Edit className="h-4 w-4" />
                  </Link>
                  <DeleteButton id={item.id} action={deleteBrandLogoAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
