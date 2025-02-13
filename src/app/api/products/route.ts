import { Product } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

export async function GET(response: Response) {
  //   const { orderId } = await request.json();
  try {
    const { data, error } = await supabase.from("Products").select(`*`);
    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ order: data }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { error: "Internal Server Error", err },
      { status: 500 }
    );
  }
}
