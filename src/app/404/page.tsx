import Link from "next/link";

export default function page() {
  return (
    <div className=" pt-[84px]">
      <div className="flex flex-col justify-center">
        <h1>404</h1>
        <p>The page you are looking for does not exists</p>
      </div>
      <Link
        href={"/"}
        className=" px-4 py-2 bg-slate-800 rounded-lg text-white"
      >
        Go back to Homepage
      </Link>
    </div>
  );
}
