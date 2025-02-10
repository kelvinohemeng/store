import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav>
        <div>Admin</div>
        <Link href={"/admin/dashboard"}>Dashboard</Link>
        <Link href={"/admin/products"}>Products</Link>
        <Link href={"/admin/orders"}>Orders</Link>
      </nav>
    </div>
  );
};

export default Header;
