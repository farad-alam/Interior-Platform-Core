'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export function AppHeader() {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (pathname === '/dashboard/login') return null

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full justify-between bg-white">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground ml-2 capitalize hidden sm:inline-block">
          {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback>{session?.user?.email?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
