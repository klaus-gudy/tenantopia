import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { id: string } }) {
    try {
        const property = await prisma.property.findUnique({
            where: { id: params.id },
        });

        if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 });

        return NextResponse.json(property);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const updatedProperty = await prisma.property.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json(updatedProperty);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }
}

export async function DELETE({ params }: { params: { id: string } }) {
    try {
        await prisma.property.delete({ where: { id: params.id } });
        return NextResponse.json({ message: 'Property deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
    }
}