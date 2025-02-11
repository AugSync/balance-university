"use client";

import { useTranslations } from "next-intl";

function Title() {
  const t = useTranslations("HomePage");
  return <h1 className="text-4xl font-bold text-center">{t("title")}</h1>;
}

export default function HomePage() {
  return <Title />;
}
