import Link from "next/link";

export default function page() {
  return (
    <>
      <div>You are not authorized to view this page</div>
      <Link
        href={"/s/home"}
        className=" px-4 py-2 bg-slate-800 rounded-lg text-white"
      >
        Go back to Homepage
      </Link>
    </>
  );
}
