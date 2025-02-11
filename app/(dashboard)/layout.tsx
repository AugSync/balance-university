"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Dashboard");
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/");
  };

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background border-r">
        <Sidebar />
      </div>
      <div className="fixed top-0 right-0 left-0 z-50 md:left-72">
        <div className="h-14 flex items-center px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <MobileSidebar />
          <div className="flex w-full justify-between">
            <div />
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src="/avatars/admin.jpg" alt={t("admin")} />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <main className="md:pl-72 pt-14">
        {children}
      </main>
    </div>
  );
} 