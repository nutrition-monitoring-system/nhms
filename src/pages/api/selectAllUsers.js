/* Get user information and add it to the SQL database using MySQL.  */
import prisma from "../../utils/prismaclientUtil.js"; // returns a global instance of prisma client for performance
export default async function handler(req, res) {
  if (req.method == "GET") {
    // Process a GET request
    const allUsers = await prisma.user.findMany();
    return res.status(200).send(allUsers);
  } else {
    // bad request
    res.status(400).json({ error: "Bad request. Wrong request method" });
  }
}
