import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./form-input";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginFormProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export function LoginForm({ onBack, showBackButton = true }: LoginFormProps) {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const loginSchema = z.object({
    email: z.string().email(t("emailError")),
    password: z.string().min(6, t("passwordError")),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const defaultValues: LoginFormValues = {
    email: "admin@balance.com",
    password: "balance123!",
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      
      const data = await response.json();
      
      console.log(data);
      if (!response.ok) {
        if (response.status === 401) {
          toast.error(t("invalidCredentials") || 'Credenciales inválidas');
          return;
        }
        throw new Error(data.error || t("loginError") || 'Error al iniciar sesión');
      }

      toast.success(t("loginSuccess") || '¡Bienvenido!');
      await router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : t("loginError") || 'Error al iniciar sesión');
    }
  };

  const values = form.watch();

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="email"
          type="email"
          label={t("email")}
          error={form.formState.errors.email?.message}
          touched={form.formState.touchedFields.email}
          value={values.email}
          maxLength={100}
          {...form.register("email")}
        />
        <FormInput
          id="password"
          type="password"
          label={t("password")}
          error={form.formState.errors.password?.message}
          touched={form.formState.touchedFields.password}
          value={values.password}
          maxLength={50}
          {...form.register("password")}
        />
        <div className="mt-8" />
        <InteractiveHoverButton 
          className="w-full bg-gray-300" 
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting ? t("submitting") : t("login")}
        </InteractiveHoverButton>
      </form>
    </div>
  );
}  