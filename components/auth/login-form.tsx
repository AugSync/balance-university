import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormInput from "./form-input";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useRouter } from "next/navigation";

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
    password: "password",
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: toFormikValidationSchema(loginSchema),
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        // Handle form submission
        await router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  const shouldShowError = (fieldName: keyof LoginFormValues) => {
    return Boolean(formik.touched[fieldName] && formik.errors[fieldName]);
  };

  const getErrorMessage = (fieldName: keyof LoginFormValues) => {
    if (shouldShowError(fieldName)) {
      return formik.errors[fieldName];
    }
    return undefined;
  };

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
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput
          id="email"
          type="email"
          label={t("email")}
          error={getErrorMessage("email")}
          touched={formik.touched.email}
          {...formik.getFieldProps("email")}
        />
        <FormInput
          id="password"
          type="password"
          label={t("password")}
          error={getErrorMessage("password")}
          touched={formik.touched.password}
          {...formik.getFieldProps("password")}
        />
        <div className="mt-8" />
        <InteractiveHoverButton 
          className="w-full bg-gray-300" 
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? t("submitting") : t("login")}
        </InteractiveHoverButton>
      </form>
    </div>
  );
}  