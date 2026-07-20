'use client'

import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar'
import { 
  LayoutDashboard, 
  Briefcase, 
  Image as ImageIcon, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  ImagePlus,
  Layers,
  LogOut,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const items = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Services', url: '/dashboard/services', icon: Layers },
  { title: 'Trust Features', url: '/dashboard/trust-features', icon: Sparkles },
  { title: 'Stats Counter', url: '/dashboard/stats', icon: Layers },
  { title: 'Gallery', url: '/dashboard/gallery', icon: ImageIcon },
  { title: 'Testimonials', url: '/dashboard/testimonials', icon: MessageSquare },
  { title: 'FAQs', url: '/dashboard/faqs', icon: HelpCircle },
  { title: 'Categories', url: '/dashboard/categories', icon: Layers },
  { title: 'Media Library', url: '/dashboard/media', icon: ImagePlus },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  // Do not render sidebar on login page
  if (pathname === '/dashboard/login') return null

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-6 pb-2">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <Sparkles className="w-5 h-5" />
          </div>
          StudioCore
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-widest opacity-60 mt-4 mb-2">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={pathname === item.url || pathname.startsWith(`${item.url}/`)} 
                    render={<Link href={item.url} />}
                    className="font-medium h-10 px-3"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors h-10"
              onClick={() => signOut({ callbackUrl: '/dashboard/login' })}
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
