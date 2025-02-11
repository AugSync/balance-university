import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { ChevronLeft } from "lucide-react";

interface LoginFormProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export function LoginForm({ onBack, showBackButton = true }: LoginFormProps) {
  const t = useTranslations("HomePage");

  return (
    <div className="w-full max-w-sm space-y-4">
      {showBackButton && (
        <Button
          variant="secondary"
          size="icon"
          onClick={onBack}
          className="mb-4 h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          aria-label={t("back")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-left block">
            {t("email")}
          </Label>
          <Input id="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-left block">
            {t("password")}
          </Label>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full" type="submit">
          {t("login")}
        </Button>
      </form>
    </div>
  );
} 