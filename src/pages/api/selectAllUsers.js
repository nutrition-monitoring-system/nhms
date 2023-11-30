/* Get user information and add it to the SQL database using MySQL.  */
import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  if (req.method == "GET") {
    console.log("Get all users.");
    const prisma = new PrismaClient();
    // Process a GET request
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
    res.status(200).json();
  } else {
    console.log("Bad request.");
    res.status(400).json();
  }
}
