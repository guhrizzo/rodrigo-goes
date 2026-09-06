import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { Anton } from "next/font/google";
import "../globals.css";
import { getDictionary } from "./dictionaries";
import { hasLocale, htmlLang, locales } from "./locales";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const anton = Anton({ variable: "--font-display", weight: "400", subsets: ["latin"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-BR": "/pt", en: "/en", es: "/es", "x-default": "/pt" },
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} className={`${geistSans.variable} ${anton.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
