import { checkAdminAuth, loginAdmin } from "@/actions/auth";
import { DEMO_USER_EMAIL, DEMO_USER_PASSWORD } from "@/lib/demo";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  const { isAdmin } = await checkAdminAuth();
  if (isAdmin) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <form action={loginAdmin} className="flex flex-col space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p>Please sign in with your email and the pasword provided by us.</p>
      <p className="mt-4 text-sm text-black/60">
        Just want to look around? Try the demo account —{" "}
        <span className="font-medium text-black">{DEMO_USER_EMAIL}</span> /{" "}
        <span className="font-medium text-black">{DEMO_USER_PASSWORD}</span>.
        It has admin access but can&apos;t save changes.
      </p>
    </div>
  );
}
