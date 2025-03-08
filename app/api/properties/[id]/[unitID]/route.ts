import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { propertyID: string; unitID: string } }) {
    try{
        const unit = await prisma.unit.findUnique({
            where: {id: params.unitID},
            include: {
                leases: {include: {tenant: true}},
            }
        })
        return NextResponse.json(unit);
    } catch (error) {
        console.error("Error fetching unit details:", error);
    return NextResponse.json({ error: "Something went wrong during unit fetching" }, { status: 500 });
    }
}