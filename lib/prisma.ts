import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  // This prevents TypeScript from thinking that 'prisma' is a new global variable on every hot reload.
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
