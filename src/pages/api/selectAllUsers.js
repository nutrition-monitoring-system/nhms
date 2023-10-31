/* Get user information and add it to the SQL database using MySQL.  */
import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    // Process a GET request
    const allUsers = await prisma.user.findMany()
    res.send(allUsers);
  }
  else{
    res.status(400).json();
  }
}
