import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const properties = await prisma.property.findMany();
        return NextResponse.json(properties);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newProperty = await prisma.property.create({
            data: {
                name: body.name,
                type: body.type,
                city: body.city,
                district: body.district,
                street: body.street,
                address: body.address,
                description: body.description,
                ownerId: body.ownerId,
            },
        });

        return NextResponse.json(newProperty, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
    }
}