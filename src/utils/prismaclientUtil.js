import { PrismaClient } from "@prisma/client";

// this file creates a single instance of the prisma client javascript object
// just for efficiency

const prisma = new PrismaClient();

export default prisma;
