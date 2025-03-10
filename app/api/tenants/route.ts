import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
        owner: { include: { properties: { include: { units: true } } } },
        manager: { include: { assignedProperties: { include: { units: true } } } },
        tenant: true
      }
    });

    if (user?.owner) {
      const unitIds = user.owner.properties.flatMap(property => property.units.map(unit => unit.id));
      const tenants = await prisma.tenant.findMany({
        where: {
          leases: {
            some: {
              unitId: { in: unitIds }
            }
          }
        },
        include: {
          user: true,
          leases: { include: { unit: { include: { property: true } } } }
        }
      });
      return NextResponse.json(tenants);
    }
    return NextResponse.json({ error: "No properties found for the user" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return NextResponse.json({ error: "Error fetching tenants" }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     if (!body.fullName || !body.email || !body.phoneNumber || !body.propertyName) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     let user = await prisma.user.findUnique({
//       where: { email: body.email },
//     });

//     if (!user) {
//       user = await prisma.user.create({
//         data: {
//           name: body.fullName,
//           email: body.email,
//           phone: body.phoneNumber,
//           role: 'TENANT',
//         },
//       });
//     }

//     const property = await prisma.property.findFirst({
//       where: { name: body.propertyName },
//     });

//     if (!property) {
//       return NextResponse.json({ error: 'Property not found' }, { status: 404 });
//     }

//     const tenant = await prisma.tenant.create({
//       data: {
//         userId: user.id,
//         isActive: true,
//       },
//     });

//     const lease = await prisma.leaseAgreement.create({
//       data:  body  });

//     const transaction = await prisma.transaction.create({
//       data: body,
//     });

//     return NextResponse.json({
//       message: 'Tenant created successfully',
//       user,
//       tenant,
//       lease,
//       transaction,
//     }, { status: 201 });

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to create tenant' }, { status: 500 });
//   }
// }
