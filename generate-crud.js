const fs = require('fs')
const path = require('path')

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const models = [
  {
    name: 'faq',
    modelName: 'FAQ',
    plural: 'faqs',
    title: 'FAQs',
    columns: ['question', 'status'],
    fields: [
      { name: 'question', type: 'text', label: 'Question (EN)' },
      { name: 'questionAr', type: 'text', label: 'Question (AR)' },
      { name: 'answer', type: 'textarea', label: 'Answer (EN)' },
      { name: 'answerAr', type: 'textarea', label: 'Answer (AR)' },
      { name: 'status', type: 'select', label: 'Status' }
    ]
  },
  {
    name: 'testimonial',
    modelName: 'Testimonial',
    plural: 'testimonials',
    title: 'Testimonials',
    columns: ['clientName', 'rating', 'status'],
    fields: [
      { name: 'clientName', type: 'text', label: 'Client Name (EN)' },
      { name: 'clientNameAr', type: 'text', label: 'Client Name (AR)' },
      { name: 'clientLocation', type: 'text', label: 'Location (EN)' },
      { name: 'clientLocationAr', type: 'text', label: 'Location (AR)' },
      { name: 'content', type: 'textarea', label: 'Review (EN)' },
      { name: 'contentAr', type: 'textarea', label: 'Review (AR)' },
      { name: 'rating', type: 'number', label: 'Rating (1-5)' },
      { name: 'status', type: 'select', label: 'Status' }
    ]
  },
  {
    name: 'trustFeature',
    modelName: 'TrustFeature',
    plural: 'trust-features',
    title: 'Trust Features',
    columns: ['title', 'order'],
    fields: [
      { name: 'title', type: 'text', label: 'Title (EN)' },
      { name: 'titleAr', type: 'text', label: 'Title (AR)' },
      { name: 'description', type: 'textarea', label: 'Description (EN)' },
      { name: 'descriptionAr', type: 'textarea', label: 'Description (AR)' },
      { name: 'icon', type: 'text', label: 'Icon (lucide)' },
      { name: 'order', type: 'number', label: 'Order' }
    ]
  },
  {
    name: 'stat',
    modelName: 'StatCounter',
    plural: 'stats',
    title: 'Stats Counters',
    columns: ['label', 'value', 'order'],
    fields: [
      { name: 'label', type: 'text', label: 'Label (EN)' },
      { name: 'labelAr', type: 'text', label: 'Label (AR)' },
      { name: 'value', type: 'text', label: 'Value (e.g. 500+)' },
      { name: 'valueAr', type: 'text', label: 'Value (AR)' },
      { name: 'icon', type: 'text', label: 'Icon (lucide)' },
      { name: 'order', type: 'number', label: 'Order' }
    ]
  }
]

models.forEach((m) => {
  const dirPath = path.join(__dirname, `src/app/(dashboard)/dashboard/${m.plural}`)
  fs.mkdirSync(path.join(dirPath, 'new'), { recursive: true })
  fs.mkdirSync(path.join(dirPath, '[id]'), { recursive: true })
  
  // 1. Index Page
  const indexCode = `import { get${capitalize(m.plural)}Action } from '@/core/actions/${m.name.replace('Feature', '')}.actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/dashboard/components/DeleteButton'
import { delete${capitalize(m.name)}Action } from '@/core/actions/${m.name.replace('Feature', '')}.actions'

export const dynamic = 'force-dynamic'

export default async function ${capitalize(m.name)}sPage() {
  const items = await get${capitalize(m.plural)}Action()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">${m.title}</h1>
          <p className="text-muted-foreground">Manage your ${m.title.toLowerCase()}.</p>
        </div>
        <Link href="/dashboard/${m.plural}/new" className={buttonVariants({ variant: 'default' })}>
          <Plus className="mr-2 h-4 w-4" /> New
        </Link>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              ${m.columns.map(c => `<TableHead>${capitalize(c)}</TableHead>`).join('')}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={${m.columns.length + 1}} className="text-center py-6">No records found.</TableCell></TableRow>
            ) : items.map((item: any) => (
              <TableRow key={item.id}>
                ${m.columns.map(c => `<TableCell>{String(item.${c})}</TableCell>`).join('')}
                <TableCell className="text-right space-x-2">
                  <Link href={\`/dashboard/${m.plural}/\${item.id}\`} className={buttonVariants({ variant: 'outline', size: 'icon' })}><Edit className="h-4 w-4" /></Link>
                  <DeleteButton id={item.id} action={delete${capitalize(m.name)}Action} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), indexCode)

  // 2. New Page
  const newCode = `import { ${capitalize(m.name)}Form } from '@/dashboard/forms/${capitalize(m.name)}Form'
export default function New${capitalize(m.name)}Page() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">New ${m.title}</h1></div>
      <${capitalize(m.name)}Form />
    </div>
  )
}`
  fs.writeFileSync(path.join(dirPath, 'new/page.tsx'), newCode)

  // 3. Edit Page
  const editCode = `import { ${capitalize(m.name)}Form } from '@/dashboard/forms/${capitalize(m.name)}Form'
import { get${capitalize(m.name)}ByIdAction } from '@/core/actions/${m.name.replace('Feature', '')}.actions'
import { notFound } from 'next/navigation'

export default async function Edit${capitalize(m.name)}Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const item = await get${capitalize(m.name)}ByIdAction(id)
  if (!item) notFound()
  
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Edit ${m.title}</h1></div>
      <${capitalize(m.name)}Form initialData={item} />
    </div>
  )
}`
  fs.writeFileSync(path.join(dirPath, '[id]/page.tsx'), editCode)

  // 4. Form
  const formCode = `'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { create${capitalize(m.name)}Action, update${capitalize(m.name)}Action } from '@/core/actions/${m.name.replace('Feature', '')}.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export function ${capitalize(m.name)}Form({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    ${m.fields.map(f => `${f.name}: initialData?.${f.name} ?? ${f.type === 'number' ? '0' : "''"}`).join(',\n    ')}
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (initialData?.id) {
        const res = await update${capitalize(m.name)}Action(initialData.id, formData)
        if (res.success) { toast.success('Updated successfully'); router.push('/dashboard/${m.plural}'); router.refresh() } 
        else { toast.error(res.error) }
      } else {
        const res = await create${capitalize(m.name)}Action(formData)
        if (res.success) { toast.success('Created successfully'); router.push('/dashboard/${m.plural}'); router.refresh() } 
        else { toast.error(res.error) }
      }
    } catch(err) { toast.error('Error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader><CardTitle>${m.title} Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${m.fields.map(f => {
            if (f.type === 'textarea') return `<div className="space-y-2 col-span-1"><Label htmlFor="${f.name}">${f.label}</Label><Textarea id="${f.name}" name="${f.name}" value={formData.${f.name}} onChange={handleChange} dir="${f.name.endsWith('Ar') ? 'rtl' : 'ltr'}" /></div>`
            if (f.type === 'select') return `<div className="space-y-2 col-span-1"><Label htmlFor="${f.name}">${f.label}</Label><Select value={formData.${f.name}} onValueChange={(v) => setFormData({...formData, ${f.name}: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="DRAFT">Draft</SelectItem><SelectItem value="PUBLISHED">Published</SelectItem></SelectContent></Select></div>`
            return `<div className="space-y-2 col-span-1"><Label htmlFor="${f.name}">${f.label}</Label><Input type="${f.type}" id="${f.name}" name="${f.name}" value={formData.${f.name}} onChange={handleChange} dir="${f.name.endsWith('Ar') ? 'rtl' : 'ltr'}" /></div>`
          }).join('\n          ')}
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.push('/dashboard/${m.plural}')} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}`
  fs.writeFileSync(path.join(__dirname, `src/dashboard/forms/${capitalize(m.name)}Form.tsx`), formCode)
})
