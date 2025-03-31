import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/lib/utils/Providers";
import Navigation from "@/components/global-components/Navigation";
import Main from "@/components/global-components/Main";
import LoadZustandGloabalStore from "@/components/global-components/LoadZustandGloabalStore";
import CartSlide from "./(storefront)/home/components/CartSlide";
import FixedBodyOnCartOpen from "./(storefront)/home/components/FixBodyOnCartOpen";

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
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className=" overflow-x-hidden minh-full"
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
