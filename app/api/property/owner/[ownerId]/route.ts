import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET( { params }: { params: { ownerId: string } }) {
    try {
      const properties = await prisma.property.findMany({
        where: { ownerId: params.ownerId },
        include: { manager: true, units: true },
      });
  
      return NextResponse.json(properties);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch properties for owner' }, { status: 500 });
    }
  }