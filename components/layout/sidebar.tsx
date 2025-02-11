"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { SparklesText } from "@/components/magicui/sparkles-text";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const routes = [
    {
      label: t("dashboard"),
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: t("students"),
      icon: GraduationCap,
      href: "/students",
    },
  ];

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="h-14 flex items-center px-6 border-b">
        <div className="flex items-center gap-1.5">
          <SparklesText 
            text="Balance" 
            className="text-lg font-semibold"
            sparklesCount={4}
          />
          <span className="text-lg font-semibold">Academy</span>
        </div>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === route.href ? "bg-accent" : "transparent",
                pathname === route.href ? "text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
} 