const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.restaurant.createMany({
    data: [
      {
        name: "Bistro Cafe",
        latitude: 40.7128,
        longitude: -74.0060,
        address: "123 Main St",
        openingHours: "9 AM - 9 PM",
      },
      {
        name: "Ocean Grill",
        latitude: 40.7150,
        longitude: -74.0100,
        address: "456 Ocean Blvd",
        openingHours: "11 AM - 10 PM",
      },
      {
        name: "Restaurant  Z",
        address: "456 Feast Ave, Addis Ababa",
        openingHours: "9:00 AM - 9:00 PM",
        latitude: 9.0402,
        longitude: 38.7725,
      },
      {
        name: "Restaurant D",
        address: "789 Gourmet Rd, Addis Ababa",
        openingHours: "10:00 AM - 11:00 PM",
        latitude: 9.0503,
        longitude: 38.7836,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
