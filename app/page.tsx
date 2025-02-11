"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const [showLogin, setShowLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };
    
    checkSize();
    window.addEventListener("resize", checkSize);
    
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const handleLoginClick = () => {
    if (isMobile) {
      router.push("/login");
    } else {
      setShowLogin(true);
    }
  };

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

      <div className="relative z-10 flex w-full items-center justify-center px-4 sm:px-8">
        <motion.div
          className="flex flex-col items-center justify-center gap-8 text-center"
          animate={{
            x: showLogin 
              ? isMobile 
                ? "0%" 
                : windowWidth < 1150
                  ? "-50%"
                  : "-60%"
              : "0%",
            opacity: 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full max-w-[300px] xl:max-w-[500px] transition-all duration-300">
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
            {locale === "es" && (
              <span className="text-foreground">{t("university")}</span>
            )}
            <SparklesText
              text="Balance"
              className="text-3xl xl:text-5xl"
              colors={{ first: "#4F46E5", second: "#EC4899" }}
              sparklesCount={5}
            />
            {locale === "en" && (
              <span className="text-foreground text-3xl xl:text-5xl">{t("university")}</span>
            )}
          </div>

          <p className="max-w-[300px] xl:max-w-[600px] text-sm xl:text-lg text-muted-foreground">
            {t("description")}
          </p>

          <motion.div
            className="h-[40px] flex items-center justify-center"
            animate={{
              opacity: showLogin ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <RainbowButton
              onClick={handleLoginClick}
              className={showLogin ? "pointer-events-none" : ""}
            >
              {t("login")}
            </RainbowButton>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showLogin && !isMobile && (
            <motion.div
              className="absolute left-[53%] w-full"
              initial={{ x: "30%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "30%", opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut",
                opacity: { duration: 0.5 }
              }}
            >
              <LoginForm onBack={() => setShowLogin(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
