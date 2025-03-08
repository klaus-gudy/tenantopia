import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const propertyID = params.id;
        const propertyDetails = await prisma.property.findUnique({
            where: { id: propertyID},
            include: { units: true, manager : true }
        });
        if (!propertyDetails) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
          }
        return NextResponse.json(propertyDetails);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch property details" }, { status: 500 });
    }
}