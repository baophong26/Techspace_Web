import { NextResponse } from "next/server";
import connectDb from "@/configs/mongo-config";
import Department from "@/models/Department";

export async function GET() {
  try {
    await connectDb();
    const departments = await Department.find();
    return NextResponse.json({ departments: departments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
  }
}
