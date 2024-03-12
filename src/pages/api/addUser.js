/* Get user information and add it to the SQL database using MySQL.  */
import { v1 } from "uuid";
import CryptoJS from "crypto-js";
import prisma from "../../utils/prismaclientUtil.js";
export default async function handler(req, res) {
  // this handles the register page
  if (req.method === "POST") {
    // Process a POST request
    let newUserID = v1().slice(0, 32);
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
    console.log(accessibilitySettings, chronicConditions, Allergies);
    // Convert the hash to a hexadecimal string
    const passwordHash = hash.toString(CryptoJS.enc.Hex).substring(0, 30); //database only requires the 32 characters
    // creating the right structure for the database
    const data = {
      gender: gender.toUpperCase()[0], // for MALE, gender[0] = M and gender[0] = F for female
      userID: newUserID,
      password: passwordHash,
      isAdmin: Number(is_admin),
      ...newUserData,
    };
    /* Check if a user with the same email is not already in the database. */
    let currentEmail = newUserData.email;
    const emailCheck = await prisma.user.findFirst({
      where: {
        email: currentEmail,
      },
    });
    /* console.log(emailCheck); */
    /* console.log(emailCheck == null); */
    /* The email check must be false or undefined in order for a new user to be added to the database. */
    if (emailCheck == null) {
      /* Create a new user in the database. */
      console.log("New user created.");

      const newUser = await prisma.user.create({
        data: data,
      });

      /* Check if user added allergies. */
      console.log(Allergies);
      if (Allergies.length != 0) {
        /* Split allergies into an array. */
        let allergyData = Allergies.split(",");
        allergyData.forEach(async (element) => {
          /* Find each allergy in the table. */
          const checkAllergy = await prisma.allergy
            .findFirst({
              where: {
                allergyType: element,
              },
            })
            .then(async (response) => {
              // console.log(response)
              if (response != null) {
                /* Add the allergyID with the userID */
                const linkAllergyToTable = await prisma.userToAllergy.create({
                  data: { userID: newUserID, allergyID: response.allergyID },
                });
              }
            });
        });
        console.log(`Added ${Allergies} for user ${newUserData.forename}.`)
      }

      /* In the new table, the allergies that the user has will be linked to their userID. */

      /* Find all the ids of the allergies using the names. */
      console.log("New user created.");

      // return a valid response
      return res.status(200).json({ ok: "true", id: newUserID });
    } else {
      console.log("\n \u001B[31m" + "Email already used. \n");
      return res.status(400).json({ error: "Email already used." });
    }
  }
  // return an invalid response if user does not exist
  return res.status(400).json({ error: "Invalid request method." });
}
