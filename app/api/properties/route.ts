import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        let session;
        try {
            session = await auth();
        } catch (error) {
            console.error("Authentication error:", error);
            return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
        }
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                owner: { include: { properties: true } },
                manager: { include: { assignedProperties: true } },
                tenant: true
            }
        })

        if (user?.owner) {
            const properties = await prisma.property.findMany({
                where: { ownerId: user.owner.id },
                include: { manager: true, units: true },
            })
            const transformedProperties = properties.map((property) => {
                const totalUnits = property.units.length;
                const availableUnits = property.units.filter((unit) => !unit.isOccupied).length;

                return {
                    id: property.id,
                    name: property.name,
                    address: property.street,
                    type: property.type,
                    units: totalUnits,
                    availableUnits: availableUnits,
                    manager: property.manager ? `${property.manager.id}` : "No Manager",
                };
            });

            return NextResponse.json(transformedProperties);
        }
        return NextResponse.json("No properties found");
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}