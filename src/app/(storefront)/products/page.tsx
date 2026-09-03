import { getProducts } from "@/actions/product";
import ProductsView from "./ProductsView";

// Fetched here, on the server, so the grid is present in the initial HTML
// instead of an empty flash of "Loading products…" until the client store
// catches up — see the `initialProducts` comment in ProductsView.
export default async function ProductPage() {
  const products = await getProducts();

  return <ProductsView initialProducts={products} />;
}
