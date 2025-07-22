import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Delete child (Incident) before parent (Camera)
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  await prisma.camera.createMany({
    data: [
      { id: 1, name: 'Gate Cam', location: 'Entrance Gate' },
      { id: 2, name: 'Warehouse Cam', location: 'Warehouse' },
    ],
  });

  await prisma.incident.createMany({
    data: [
      {
        type: 'Intrusion',
        tsStart: new Date('2025-07-22T08:00:00Z'),
        tsEnd: new Date('2025-07-22T08:05:00Z'),
        thumbnailUrl: '/images/incident1.jpg',
        resolved: false,
        cameraId: 1,
      },
      {
        type: 'Fire',
        tsStart: new Date('2025-07-22T10:00:00Z'),
        tsEnd: new Date('2025-07-22T10:10:00Z'),
        thumbnailUrl: '/images/incident2.jpg',
        resolved: false,
        cameraId: 2,
      },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Database seeded successfully');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
