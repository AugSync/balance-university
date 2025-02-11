"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useTranslations, useLocale } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <div className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 text-center sm:px-8">
        <div className="relative w-full max-w-[500px] transition-all duration-300">
          <Image
            src="/university.svg"
            alt="Universidad"
            width={500}
            height={372}
            className="drop-shadow-xl"
            priority
          />
        </div>

        <div className="flex items-baseline gap-4 text-3xl sm:text-4xl md:text-5xl font-bold">
          {locale === 'es' && <span className="text-foreground">{t("university")}</span>}
          <SparklesText
            text="Balance"
            className="text-3xl sm:text-4xl md:text-5xl"
            colors={{ first: "#4F46E5", second: "#EC4899" }}
            sparklesCount={5}
          />
          {locale === 'en' && <span className="text-foreground">{t("university")}</span>}
        </div>

        <p className="max-w-[600px] text-lg text-muted-foreground">
          {t("description")}
        </p>

        <RainbowButton onClick={() => (window.location.href = "/dashboard")}>
          {t("login")}
        </RainbowButton>
      </div>
    </div>
  );
}
