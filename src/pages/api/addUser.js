/* Get user information and add it to the SQL database using MySQL.  */
import { v1 } from "uuid";
import { PrismaClient } from "@prisma/client";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const prisma = new PrismaClient();
    let newUUID = v1().slice(0, 32);
    /* Check if data is a string or a json object already. */
    let newUserData = JSON.parse(req.body);
    /* Create a new user in the database. */
    console.log("BACKEND");
    console.log(newUserData);
    newUserData["userID"] = newUUID;
    if (newUserData["gender"].length > 1) {
      newUserData["gender"] = newUserData["gender"]
        .toString()
        .charAt(0)
        .toUpperCase();
    }
    const newUser = await prisma.user.create({ data: newUserData });
    res.send(newUUID);
    res.status(200).json();
  } else {
    res.status(400).json();
  }
}
