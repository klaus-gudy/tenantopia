import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phone, password } = body;

        if (!firstName || !lastName || !email || !phone || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { phone }] },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                email,
                phone,
                password: hashedPassword,
                role: "OWNER",
            },
        });

        return NextResponse.json({ user: newUser, message: "User created successfully" }, { status: 201 });
    } catch (e) {
        console.error("Registration error:", e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}