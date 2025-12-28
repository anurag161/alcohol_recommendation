import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const region = searchParams.get('region') || '';

    // Build the where clause dynamically
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (region) {
      where.region = region;
    }

    const brands = await prisma.brand.findMany({
      where,
      orderBy: {
        rating: 'desc'
      }
    });

    return NextResponse.json({ brands });

  } catch (error: any) {
    console.error("BRANDS API ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

