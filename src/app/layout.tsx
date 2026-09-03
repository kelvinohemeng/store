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

export const metadata: Metadata = {
  title: "Oman Kwesi",
  description: "Oman Kwesi — dresses, traditional wear, shoes & glasses.",
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
      <body className=" overflow-x-hidden minh-full">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
