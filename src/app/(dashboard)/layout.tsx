import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/dashboard/layouts/AppSidebar'
import { AppHeader } from '@/dashboard/layouts/AppHeader'
import { DashboardProviders } from '@/dashboard/layouts/DashboardProviders'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProviders>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full min-h-screen">
          <AppHeader />
          <main className="flex-1 p-6 bg-gray-50/50">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </DashboardProviders>
  )
}
