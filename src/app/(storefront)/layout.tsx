import Navigation from "@/components/global-components/Navigation";
import LoadProducts from "./_storeComponents/LoadProducts";
import StoreQueryProvider from "./_storeComponents/StoreQueryProvider";
import CartSlide from "./home/components/CartSlide";
import LoadZustandGloabalStore from "@/components/global-components/LoadZustandGloabalStore";
// import FixedBodyOnCartOpen from "./home/components/FixBodyOnCartOpen";
import Main from "@/components/global-components/Main";
import Footer from "@/components/global-components/Footer";
import { getCurrentStoreUser } from "@/actions/auth";

export default async function StoreFrontRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the session on the server so the client store can be seeded with
  // the real user before first paint — see LoadZustandGloabalStore.
  const initialUser = await getCurrentStoreUser();

  return (
    <div className="minh-full">
      <StoreQueryProvider>
        <Navigation />
        <LoadProducts />
        <CartSlide />
        <LoadZustandGloabalStore initialUser={initialUser} />
        {/* <FixedBodyOnCartOpen /> */}
        <Main>{children}</Main>
        <Footer />
      </StoreQueryProvider>
    </div>
  );
}
