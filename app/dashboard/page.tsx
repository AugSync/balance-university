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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] p-4 md:p-8 pt-6">
      <div className="mx-auto w-full max-w-7xl flex-1">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col space-y-4 md:space-y-0">
            <div className="flex items-center justify-between md:justify-start">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h2>
              <div className="flex md:hidden items-center">
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
            <div className="md:hidden w-full">
              <CalendarDateRangePicker />
            </div>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-4">
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
        <Tabs defaultValue="mathematics" className="flex-1 flex flex-col mt-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="max-w-full">
              <TabsList className="inline-flex w-full md:w-auto min-w-full md:min-w-[600px]">
                {careers.map((career) => (
                  <TabsTrigger 
                    key={career.id} 
                    value={career.id}
                    className="flex-1 text-xs md:text-sm px-2 md:px-4"
                  >
                    {career.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {careers.map((career) => (
            <TabsContent key={career.id} value={career.id} className="flex-1 space-y-4 mt-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 h-full">
                <div className="col-span-1 md:col-span-4 flex flex-col space-y-4">
                  <div className="grid gap-4 grid-cols-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs md:text-sm font-medium">
                          {t("stats.totalStudents")}
                        </CardTitle>
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl md:text-2xl font-bold">2,350</div>
                        <p className="text-[10px] md:text-xs text-muted-foreground">
                          {t("stats.totalStudentsChange")}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs md:text-sm font-medium">
                          {t("stats.activeStudents")}
                        </CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl md:text-2xl font-bold">573</div>
                        <p className="text-[10px] md:text-xs text-muted-foreground">
                          {t("stats.activeStudentsChange")}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>{t("overview")}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                </div>
                <Card className="col-span-1 md:col-span-3 h-full">
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
