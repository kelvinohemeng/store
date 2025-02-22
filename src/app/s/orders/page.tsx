import { createClient } from "@/lib/utils/supabase";
import { redirect } from "next/navigation";

export default async function page() {
  // const supabase = createClient();
  // const { data, error } = await supabase.auth.getUser();

  // if (error || !data?.user) {
  //   redirect("/login");
  // }

  // console.log(error);

  return <div>Orders displayed her</div>;
}
