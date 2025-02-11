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
import { UserIcon, UsersIcon } from "lucide-react";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { useTranslations } from "next-intl";
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
    <div className="flex-1 flex flex-col min-h-[calc(100vh-2rem)] p-4 md:p-8 pt-6 w-full">
      <div className="w-full flex-1">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col space-y-4 md:space-y-0">
            <div className="flex items-center justify-between md:justify-start">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h2>
            </div>
            <div className="md:hidden w-full">
              <CalendarDateRangePicker />
            </div>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-4">
            <CalendarDateRangePicker />
          </div>
        </div>
        <Tabs defaultValue="mathematics" className="flex-1 flex flex-col mt-4 w-full">
          <div className="w-full overflow-x-auto md:overflow-x-visible">
            <TabsList className="w-full md:w-auto min-w-max md:min-w-0 inline-flex">
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
          {careers.map((career) => (
            <TabsContent key={career.id} value={career.id} className="flex-1 space-y-4 my-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-7 h-full w-full">
                <div className="col-span-1 lg:col-span-4 flex flex-col space-y-4">
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
                <Card className="col-span-1 lg:col-span-3 h-full">
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