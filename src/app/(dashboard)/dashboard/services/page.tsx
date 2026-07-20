import { getServices } from '@/core/services/service.service'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const services = await getServices(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage the services your agency offers.
          </p>
        </div>
        <Link href="/dashboard/services/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" />
          New Service
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No services found. Click "New Service" to add one.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.slug}</TableCell>
                  <TableCell>
                    <Badge variant={service.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/dashboard/services/${service.id}`} className={buttonVariants({ variant: 'outline', size: 'icon' })}>
                      <Edit className="h-4 w-4" />
                    </Link>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
