/* Get user information and add it to the SQL database using MySQL.  */
import { v1 } from "uuid";
import CryptoJS from "crypto-js";
import prisma from "../../utils/prismaclientUtil.js";
export default async function handler(req, res) {
  // this handles the register page
  if (req.method === "POST") {
    // Process a POST request
    //const prisma = new PrismaClient();
    let newUUID = v1().slice(0, 32);
    /* Create a new user in the database. */
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
      password,
      ...newUserData
    } = req.body;
    // Hash the password using SHA-256
    const hash = CryptoJS.SHA256(password);

    // Convert the hash to a hexadecimal string
    const passwordHash = hash.toString(CryptoJS.enc.Hex).substring(0, 30); //database only requires the 32 characters
    data = {
      gender: newUserData.toUpperCase(),
      userID: newUUID,
      password: passwordHash,
      is_admin: Number(is_admin),
      ...newUserData,
    };
    const newUser = await prisma.user.create({
      data: data,
    });
    return res.status(200).json({ id: newUUID });
  }
  return res.status(400).json({ error: "Unable to add user" });
}
