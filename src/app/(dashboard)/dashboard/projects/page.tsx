import { getProjects } from '@/core/services/project.service'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/dashboard/components/DeleteButton'
import { deleteProjectAction } from '@/core/actions/project.actions'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  // Pass true to include drafts in the dashboard view
  const projects = await getProjects(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your interior design projects and portfolio.
          </p>
        </div>
        <Link href="/dashboard/projects/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No projects found. Click "New Project" to add one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category?.name || 'Uncategorized'}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/dashboard/projects/${project.id}`} className={buttonVariants({ variant: 'outline', size: 'icon' })}>
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteButton id={project.id} action={deleteProjectAction} />
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
