import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid incident ID' }, { status: 400 });
  }

  try {
    const incident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    });

    return NextResponse.json({ success: true, incident });
  } catch (error) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
  }
}
