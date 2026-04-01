import { NextResponse } from "next/server";
import connectDb from "@/configs/mongo-config";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const product = await Product.findById(id);
    return NextResponse.json({ product: product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
