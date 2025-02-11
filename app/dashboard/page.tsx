"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentStudents } from "@/components/dashboard/recent-students";
import { Overview } from "@/components/dashboard/overview";
import { SchoolIcon, GlobeIcon, UserIcon, UsersIcon, LogOut } from "lucide-react";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const router = useRouter();

  const careers = [
    { id: "mathematics", label: t("careers.mathematics") },
    { id: "social-sciences", label: t("careers.socialSciences") },
    { id: "engineering", label: t("careers.engineering") },
    { id: "fashion", label: t("careers.fashion") },
    { id: "audiovisual-arts", label: t("careers.audiovisualArts") },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    router.push("/");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <div className="flex items-center space-x-4">
            <CalendarDateRangePicker />
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
        <Tabs defaultValue="mathematics" className="space-y-4">
          <div className=" max-w-3xl">
            <TabsList className="grid w-full grid-cols-5">
              {careers.map((career) => (
                <TabsTrigger 
                  key={career.id} 
                  value={career.id}
                  className="text-sm"
                >
                  {career.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {careers.map((career) => (
            <TabsContent key={career.id} value={career.id} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("stats.totalStudents")}
                    </CardTitle>
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,350</div>
                    <p className="text-xs text-muted-foreground">
                      {t("stats.totalStudentsChange")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("stats.activeStudents")}
                    </CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">
                      {t("stats.activeStudentsChange")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("stats.onlineMode")}
                    </CardTitle>
                    <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      {t("stats.onlineModeChange")}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("stats.inPersonMode")}
                    </CardTitle>
                    <SchoolIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,116</div>
                    <p className="text-xs text-muted-foreground">
                      {t("stats.inPersonModeChange")}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>{t("overview")}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>{t("recentStudents.title")}</CardTitle>
                    <CardDescription>
                      {t("recentStudents.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentStudents />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
