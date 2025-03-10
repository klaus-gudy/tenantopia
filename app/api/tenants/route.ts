import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const tenants = await prisma.tenant.findMany();
        return NextResponse.json(tenants);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching tenants' }, { status: 500 });
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
