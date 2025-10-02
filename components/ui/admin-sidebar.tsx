'use client';

import { memo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Award,
  Briefcase,
  Settings,
  Moon,
  User,
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { title: 'Inquiries', icon: MessageSquare, href: '/admin/activity' },
  { title: 'Team Members', icon: Users, href: '/admin/users' },
  { title: 'Services', icon: Briefcase, href: '/admin/services' },
  { title: 'Testimonials', icon: Award, href: '/admin/testimonials' },
  { title: 'Blog Posts', icon: FileText, href: '/admin/blog' },
  { title: 'Settings', icon: Settings, href: '/admin/settings' },
];

export const AdminSidebar = memo(() => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <Link prefetch={false} href="/admin" className="flex items-center gap-3">
          {isCollapsed ? (
            <div 
              className="flex aspect-square size-9 items-center justify-center rounded-lg p-1.5" 
              style={{ background: 'linear-gradient(135deg, #052814 0%, #074d24 100%)' }}
            >
              <Image 
                src="/Asset 11.svg" 
                alt="Pines VA" 
                width={32} 
                height={32}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
          ) : (
            <>
              <div 
                className="flex aspect-square size-11 items-center justify-center rounded-xl p-2" 
                style={{ background: 'linear-gradient(135deg, #052814 0%, #074d24 100%)' }}
              >
                <Image 
                  src="/Asset 11.svg" 
                  alt="Pines VA" 
                  width={40} 
                  height={40}
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="font-semibold text-base" style={{ color: '#052814' }}>Pines VA</span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
            </>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="px-0 mb-3 text-xs font-medium text-gray-400 uppercase tracking-wide group-data-[collapsible=icon]:sr-only">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.title}
                      className={`
                        relative h-9 px-2.5 rounded-md transition-colors
                        hover:bg-gray-50
                        data-[active=true]:bg-green-50
                        group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9
                      `}
                    >
                      <Link prefetch={false} href={item.href} className="flex items-center gap-3 w-full">
                        <Icon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? 'text-[#052814]' : 'text-gray-600'}`} />
                        <span className={`text-sm group-data-[collapsible=icon]:hidden ${isActive ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{item.title}</span>
                        {isActive && !isCollapsed && (
                          <div className="ml-auto w-1 h-full rounded-l-sm" style={{ marginRight: '-10px', backgroundColor: '#052814' }} />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 mt-auto p-3">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 px-2.5 rounded-md hover:bg-gray-50 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9"
              tooltip="Dark Mode"
            >
              <Moon className="h-[18px] w-[18px] text-gray-600" />
              <span className="text-sm text-gray-600 group-data-[collapsible=icon]:hidden">Dark Mode</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="h-9 px-2.5 rounded-md hover:bg-gray-50 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9"
              tooltip="Admin Profile"
            >
              <Link prefetch={false} href="/admin/profile">
                {isCollapsed ? (
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full text-xs font-medium">
                    N
                  </div>
                ) : (
                  <>
                    <User className="h-[18px] w-[18px] text-gray-600" />
                    <span className="text-sm text-gray-600">Admin Profile</span>
                  </>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
});

AdminSidebar.displayName = 'AdminSidebar';
