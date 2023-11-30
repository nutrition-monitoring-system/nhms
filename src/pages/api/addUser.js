/* Get user information and add it to the SQL database using MySQL.  */
import { v1 } from "uuid";
import CryptoJS from "crypto-js";
import prisma from "../../utils/prismaclientUtil.js";
export default async function handler(req, res) {
  // this handles the register page
  if (req.method === "POST") {
    // Process a POST request
    let newUUID = v1().slice(0, 32);
    // getting the data needed for the right table
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
      gender,
      ...newUserData
    } = req.body;
    // Hash the password using SHA-256
    const hash = CryptoJS.SHA256(password);

    // Convert the hash to a hexadecimal string
    const passwordHash = hash.toString(CryptoJS.enc.Hex).substring(0, 30); //database only requires the 32 characters
    // creating the right structure for the database
    const data = {
      gender: gender.toUpperCase()[0], // for MALE, gender[0] = M and gender[0] = F for female
      userID: newUUID,
      password: passwordHash,
      is_admin: Number(is_admin),
      ...newUserData,
    };
    /* Create a new user in the database. */
    const newUser = await prisma.user.create({
      data: data,
    });
    // return a valid response
    return res.status(200).json({ ok: "true", id: newUUID });
  }
  // return an invalid response if user does not exist
  return res.status(400).json({ error: "Unable to add user" });
}
