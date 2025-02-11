import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
}

const FormInput = memo(function FormInput({
  id,
  label,
  type = "text",
  error,
  touched,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-left block">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        className={cn(touched && error && "border-red-500", className)}
        {...props}
      />
      {touched && error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

export default FormInput; 