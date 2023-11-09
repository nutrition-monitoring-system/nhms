/* Get user information and add it to the SQL database using MySQL.  */
import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "DELETE") {
    // Process a DELETE request
    let deleteUserID = req.body;
    console.log(deleteUserID);
    try {
      const selectUser = await prisma.user.findUnique({
        where: {
          userID: deleteUserID,
        },
      });
      console.log(selectUser);
      const deleteUser = await prisma.user.delete({
        where: {
          userID: deleteUserID,
        },
      });
      selectUser["password"] = "*" * length(selectUser[password])
      console.log(`Deleted user with userID ${deleteUserID}`);
      res.send(0);
      res.status(200).json();
    } catch {

    }
  } else {
    res.status(400).json();
  }
}
