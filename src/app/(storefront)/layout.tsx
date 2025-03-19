import Navigation from "@/components/global-components/Navigation";
import LoadProducts from "./_storeComponents/LoadProducts";
import StoreQueryProvider from "./_storeComponents/StoreQueryProvider";
import CartSlide from "./home/components/CartSlide";
import LoadZustandGloabalStore from "@/components/global-components/LoadZustandGloabalStore";
import FixedBodyOnCartOpen from "./home/components/FixBodyOnCartOpen";
import Main from "@/components/global-components/Main";

export default async function StoreFrontRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      className="minh-full"
    >
      <StoreQueryProvider>
        <Navigation />
        <LoadProducts />
        <CartSlide />
        <LoadZustandGloabalStore />
        <FixedBodyOnCartOpen />
        <Main>{children}</Main>
      </StoreQueryProvider>
    </div>
  );
}
