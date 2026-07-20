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
          <main className="flex-1 p-6 md:p-10 bg-muted/30">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </DashboardProviders>
  )
}
