import type { Metadata } from "next";
import { Anton, Archivo, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/utils/Providers";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Mirrors wrangler.jsonc's `vars.BETTER_AUTH_URL` — the deployed Worker's
// canonical URL. Kept as a plain constant (rather than read from env) since
// `metadata` is a static export evaluated at module scope, before any
// request/Cloudflare context exists.
const SITE_URL = "https://store.kelvinohemeng59.workers.dev";
const SITE_NAME = "Oman Kwesi";
const SITE_DESCRIPTION = "Oman Kwesi — dresses, traditional wear, shoes & glasses.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} ${fraunces.variable} ${inter.variable}`}
    >
      <body className="overflow-x-hidden min-h-full">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
