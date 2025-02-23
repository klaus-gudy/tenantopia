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