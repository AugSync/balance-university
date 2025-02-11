"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import Cookies from 'js-cookie';

const languages = [
  {
    value: "en",
    label: "English",
    flag: "🇺🇸"
  },
  {
    value: "es",
    label: "Español",
    flag: "🇪🇸"
  }
];

export function LanguageSelector() {
  const locale = useLocale();
  const currentLanguage = languages.find(lang => lang.value === locale);

  const handleLanguageChange = (value: string) => {
    // Set the cookie with the new locale
    Cookies.set('NEXT_LOCALE', value, { path: '/' });
    // Reload the page to apply the new locale
    window.location.reload();
  };

  return (
    <Select defaultValue={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[130px] bg-background border-none focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center gap-2">
          <span className="text-base">{currentLanguage?.flag}</span>
          <span>{currentLanguage?.label}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem 
            key={language.value} 
            value={language.value}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{language.flag}</span>
              <span>{language.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 