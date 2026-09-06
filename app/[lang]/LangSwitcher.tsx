"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "./locales";

export default function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(pt|en|es)(?=\/|$)/, "") || "/";

  return (
    <div className="lang-switcher" aria-label="Idioma / Language">
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}${rest === "/" ? "" : rest}`}
          hrefLang={code}
          aria-current={code === current ? "true" : undefined}
          className={code === current ? "is-active" : undefined}
        >
          {localeNames[code]}
        </Link>
      ))}
    </div>
  );
}
