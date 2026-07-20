import { getCategories } from '@/core/services/category.service'
import { CategoryManager } from '@/dashboard/components/CategoryManager'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Manage categories for your projects and gallery items.
        </p>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  )
}
