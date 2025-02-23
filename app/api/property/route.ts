import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const properties = await prisma.property.findMany();
    return NextResponse.json(properties);
}

export async function POST(req: Request) {
    const body = await req.json();
    const property = await prisma.property.create({
        data: {
            name: body.name,
            address: body.address,
            city: body.city,
            district: body.district,
            street: body.street,
            description: body.description,
            type: body.type,
            ownerId: body.ownerId
        }
    });
    return NextResponse.json(property, { status: 201 });
}