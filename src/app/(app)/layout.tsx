
'use client';
import { Logo } from '@/components/icons';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { state } = useSidebar();
  const isActive = (path: string) => pathname.startsWith(path);

  const handleSignOut = () => {
    // In a real app, you would also clear session/authentication state here
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });
    router.push('/login');
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/dashboard" className="block">
            <Logo className="text-foreground" />
          </Link>
        </SidebarHeader>
        <SidebarContent className="py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/dashboard'}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/students')}
                tooltip="Students"
              >
                <Link href="/students">
                  <Users />
                  <span>Students</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/classes')}
                tooltip="Classes"
              >
                <Link href="/classes">
                  <BookOpen />
                  <span>Classes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className={cn("flex items-center p-4", state === 'collapsed' ? 'justify-center px-2' : 'gap-2')}>
              <ThemeSwitcher />
              <SidebarMenuButton tooltip="Settings" size="icon" variant="ghost">
                <Settings />
                <span className="sr-only">Settings</span>
              </SidebarMenuButton>
            </div>
            <Separator />
            <div className={cn("p-4", state === 'collapsed' && 'p-2')}>
                 <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out" variant="ghost" className="w-full">
                    <LogOut />
                    <span className={cn(state === 'collapsed' && 'sr-only')}>Sign Out</span>
                </SidebarMenuButton>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1">
                  {/* Header content can go here if needed */}
              </div>
          </header>
          <main className="p-4 sm:p-6">
              {children}
          </main>
      </SidebarInset>
    </div>
  )
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
