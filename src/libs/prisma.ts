 import { PrismaClient } from '@prisma/client';

declare const global: any & { prisma?: PrismaClient };

if (!global.prisma) {
    global.prisma = new PrismaClient();
}

const prisma = global.prisma;

export default prisma;