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
import { RecentStudentsDescription } from "@/components/dashboard/recent-students-description";
import { Overview } from "@/components/dashboard/overview";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const [selectedCareer, setSelectedCareer] = useState("mathematics");

  const careers = [
    { id: "mathematics", label: t("careers.mathematics") },
    { id: "social-sciences", label: t("careers.socialSciences") },
    { id: "engineering", label: t("careers.engineering") },
    { id: "fashion", label: t("careers.fashion") },
    { id: "audiovisual-arts", label: t("careers.audiovisualArts") },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-2rem)] p-4 md:p-8 pt-6 w-full">
      <div className="w-full flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h2>
        </div>
        <Tabs 
          defaultValue="mathematics" 
          className="flex-1 flex flex-col mt-4 w-full"
          onValueChange={setSelectedCareer}
        >
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
                  <StatsCards />
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>{t("overview")} - {career.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview career={selectedCareer} />
                    </CardContent>
                  </Card>
                </div>
                <Card className="col-span-1 lg:col-span-3 h-full">
                  <CardHeader>
                    <CardTitle>{t("recentStudents.title")}</CardTitle>
                    <CardDescription>
                      <RecentStudentsDescription />
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