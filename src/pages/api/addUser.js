/* Get user information and add it to the SQL database using MySQL.  */
import { v1 } from "uuid";
import prisma from "../../utils/prismaclientUtil.js";
export default async function handler(req, res) {
  // this handles the register page
  if (req.method === "POST") {
    // Process a POST request
    //const prisma = new PrismaClient();
    let newUUID = v1().slice(0, 32);
    /* Create a new user in the database. */
    // foodCategories;
    // Allergies;
    // chronicConditions;
    // accessibilitySettings;
    const {
      redirect,
      foodCategories,
      Allergies,
      chronicConditions,
      accessibilitySettings,
      is_admin,
      registration,
      csrfToken,
      callbackUrl,
      json,
      ...newUserData
    } = req.body;

    newUserData["userID"] = newUUID;
    if (newUserData["gender"].length > 1) {
      newUserData["gender"] = newUserData["gender"]
        .toString()
        .charAt(0)
        .toUpperCase();
    }
    console.log("", newUserData);
    const newUser = await prisma.user.create({
      data: { is_admin: Number(is_admin), ...newUserData },
    });
    console.log("user data: ", newUserData);
    return res.status(200).json({ id: newUUID });
  }
  return res.status(400).json({ error: "Unable to add user" });
}
