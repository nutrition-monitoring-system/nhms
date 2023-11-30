import { PrismaClient } from "@prisma/client";
// this file creates and returns a single global instance of the prisma client javascript object
const prisma = new PrismaClient();

export default prisma;
