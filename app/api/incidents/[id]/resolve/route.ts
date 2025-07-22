import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const incidentId = parseInt(params.id);

  if (isNaN(incidentId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const updated = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
    });

    return NextResponse.json({ success: true, incident: updated });
  } catch (err) {
    console.error('Error updating incident:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
 
