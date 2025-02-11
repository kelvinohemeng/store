import { supabase } from "@/lib/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  //   const { orderId } = await request.json();
  try {
    const { data, error } = await supabase
      .from("Orders")
      .select(`*`)
      .eq("id", id)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ order: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
