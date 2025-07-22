import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resolved = searchParams.get('resolved');

  const incidents = await prisma.incident.findMany({
    where: {
      resolved: resolved === 'true' ? true : false,
    },
    orderBy: {
      tsStart: 'desc',
    },
    include: {
      camera: true,
    },
  });

  return NextResponse.json(incidents);
}
