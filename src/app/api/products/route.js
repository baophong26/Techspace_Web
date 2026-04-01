import { NextResponse } from "next/server";
import connectDb from "@/configs/mongo-config";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    await connectDb();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    
    const products = await Product.find(query);
    return NextResponse.json({ products: products });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
