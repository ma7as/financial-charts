import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create some popular crypto symbols
  const symbols = await Promise.all([
    prisma.symbol.upsert({
      where: { symbol: 'BTCUSDT' },
      update: {},
      create: {
        symbol: 'BTCUSDT',
        name: 'Bitcoin',
        exchange: 'Binance',
        type: 'crypto',
        isActive: true,
      },
    }),
    prisma.symbol.upsert({
      where: { symbol: 'ETHUSDT' },
      update: {},
      create: {
        symbol: 'ETHUSDT',
        name: 'Ethereum',
        exchange: 'Binance',
        type: 'crypto',
        isActive: true,
      },
    }),
    prisma.symbol.upsert({
      where: { symbol: 'BNBUSDT' },
      update: {},
      create: {
        symbol: 'BNBUSDT',
        name: 'Binance Coin',
        exchange: 'Binance',
        type: 'crypto',
        isActive: true,
      },
    }),
    prisma.symbol.upsert({
      where: { symbol: 'SOLUSDT' },
      update: {},
      create: {
        symbol: 'SOLUSDT',
        name: 'Solana',
        exchange: 'Binance',
        type: 'crypto',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${symbols.length} symbols`);

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      username: 'demo',
      password: '$2b$10$YourHashedPasswordHere', // En producción usar bcrypt
      firstName: 'Demo',
      lastName: 'User',
      isActive: true,
    },
  });

  console.log(`✅ Created demo user: ${user.email}`);

  // Create a default watchlist
  const watchlist = await prisma.watchlist.create({
    data: {
      userId: user.id,
      name: 'My Favorites',
      description: 'My favorite cryptocurrencies',
      isDefault: true,
      items: {
        create: [
          { symbolId: symbols[0].id, position: 0 }, // BTC
          { symbolId: symbols[1].id, position: 1 }, // ETH
        ],
      },
    },
  });

  console.log(`✅ Created watchlist: ${watchlist.name}`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
