import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const properties = await prisma.property.findMany({
            where: { ownerId: session.user.id },
            include: { manager: true, units: true },
        });
        
        const transformedProperties = properties.map((property) => {
            const totalUnits = property.units.length;
            const availableUnits = property.units.filter((unit) => !unit.isOccupied).length;
      
            return {
              id: property.id,
              name: property.name,
              address: property.address,
              type: property.type,
              units: totalUnits,
              availableUnits: availableUnits,
              manager: property.manager ? `${property.manager.id}` : "No Manager",
            };
          });
        return NextResponse.json(transformedProperties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}