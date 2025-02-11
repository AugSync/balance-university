"use client";

import { useTranslations } from "next-intl";

export default function StudentsPage() {
  const t = useTranslations("Navigation");

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 pt-6">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("students")}</h2>
        {/* Add students content here */}
      </div>
    </div>
  );
} 