import { getSiteSettings } from '@/core/services/settings.service'
import { SettingsForm } from '@/dashboard/forms/SettingsForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your website's contact information and global settings.
        </p>
      </div>
      
      <SettingsForm initialData={settings} />
    </div>
  )
}
