// app/api/incidents/[id]/resolve/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context; // Awaiting params
  const id = Number(params.id); // Convert the id from string to number
  try {
    // Update the incident to set resolved to true
    const incident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: { camera: true }, // Include camera details in the response
    });
    // Return the updated incident as JSON
    return NextResponse.json(incident);
  } catch (error) {
    // Handle errors (e.g., incident not found)
    return NextResponse.json({ error: "Incident not found" }, { status: 404 });
  }
}