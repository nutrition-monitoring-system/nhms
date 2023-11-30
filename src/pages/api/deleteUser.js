/* Get user information and add it to the SQL database using MySQL.  */
import prisma from "@/utils/prismaclientUtil";
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // Process a DELETE request
    let deleteUserID = req.body;
    try {
      // try to check first if the user exists
      const selectUser = await prisma.user.findUnique({
        where: {
          userID: deleteUserID,
        },
      });
      // if user exists then delete the user entry from the table
      const deleteUser = await prisma.user.delete({
        where: {
          userID: deleteUserID,
        },
      });

      // selectUser["password"] = "*" * length(selectUser[password]);
      // console.log(`Deleted user with userID ${deleteUserID}`);
      // sending a valid response back
      res.status(200).json({ value: "user deleted Successfully" });
    } catch (e) {
      // unable to delete the user
      res.status(200).json({ value: "Unable to delete user", error: e });
    }
  } else {
    // wrong request type
    res.status(400).json({ error: "Wrong request method!" });
  }
}
