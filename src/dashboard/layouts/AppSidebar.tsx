'use client'

import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar'
import { 
  LayoutDashboard, 
  Briefcase, 
  Image as ImageIcon, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  ImagePlus,
  Layers
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Projects', url: '/dashboard/projects', icon: Briefcase },
  { title: 'Services', url: '/dashboard/services', icon: Layers },
  { title: 'Categories', url: '/dashboard/categories', icon: Layers },
  { title: 'Gallery', url: '/dashboard/gallery', icon: ImageIcon },
  { title: 'Testimonials', url: '/dashboard/testimonials', icon: MessageSquare },
  { title: 'FAQs', url: '/dashboard/faqs', icon: HelpCircle },
  { title: 'Media Library', url: '/dashboard/media', icon: ImagePlus },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  // Do not render sidebar on login page
  if (pathname === '/dashboard/login') return null

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Agency Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
