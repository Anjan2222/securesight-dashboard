import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const incidents = [
    {
      id: 1,
      type: "Fire",
      tsStart: "2025-07-22T08:30:00Z",
      tsEnd: "2025-07-22T08:35:00Z",
      thumbnailUrl: "/thumbnails/thumb1.jpg",
      camera: { name: "Main Gate", location: "South" },
      resolved: false,
    },
    {
      id: 2,
      type: "Intrusion",
      tsStart: "2025-07-22T09:00:00Z",
      tsEnd: "2025-07-22T09:10:00Z",
      thumbnailUrl: "/thumbnails/thumb2.jpg",
      camera: { name: "Warehouse", location: "East" },
      resolved: false,
    },
  ];

  return NextResponse.json(incidents);
}
