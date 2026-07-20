import { ProjectForm } from '@/dashboard/forms/ProjectForm'
import { getCategories } from '@/core/services/category.service'

export const dynamic = 'force-dynamic'

export default async function NewProjectPage() {
  const categories = await getCategories('project')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground">
          Add a new interior design project to your portfolio.
        </p>
      </div>

      <ProjectForm categories={categories} />
    </div>
  )
}
