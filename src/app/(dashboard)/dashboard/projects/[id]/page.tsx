import { ProjectForm } from '@/dashboard/forms/ProjectForm'
import { getProjectById } from '@/core/services/project.service'
import { getCategories } from '@/core/services/category.service'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id)
  const categories = await getCategories('project')

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">
          Update the details of your interior design project.
        </p>
      </div>

      <ProjectForm initialData={project} categories={categories} />
    </div>
  )
}
