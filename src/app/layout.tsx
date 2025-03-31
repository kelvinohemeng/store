import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/lib/utils/Providers";

export const metadata: Metadata = {
  title: "Ecomara Ecommerce Website",
  description:
    "Ecommerce Template Website | NextJS 14 | TailwindCSS | Paystack",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" overflow-x-hidden minh-full">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
