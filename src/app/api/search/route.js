import { NextResponse } from "next/server";
import connectDb from "@/configs/mongo-config";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const queryStr = searchParams.get('query');
    
    let products = [];
    if (queryStr) {
      let regexp = new RegExp(`${queryStr}`, 'i');
      products = await Product.find({
        $or: [
          { title: { $regex: regexp } },
          { category: { $regex: regexp } },
          { department: { $regex: regexp } }
        ]
      });
    }
    
    return NextResponse.json({ products: products });
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
