import prisma from "../../utils/prismaclientUtil.js"; // this is an import of an existing instance of the client
import CryptoJS from "crypto-js";
export default async function Handle(req, res) {
  // this handles the login page
  // check to see if the user's email and password is valid
  const { email, password } = req.body;
  // search the database if there an entry where users.email === email from frontend
  const userData = await prisma.user.findFirst({ where: { email: email } });

  if (userData) {
    // Hash the provided password using SHA-256
    const hash = CryptoJS.SHA256(password);
    const passwordHash = hash.toString(CryptoJS.enc.Hex).substring(0, 30);

    // Compare the hashed passwords
    if (userData.password === passwordHash) {
      return res.status(200).json({
        ok: "true",
        id: userData.userID,
        email: email,
        surname: userData.surname,
        gender: userData.gender,
      });
    } else {
      // return error if the password is invalid
      return res.status(400).json({ error: "Password is not valid!" });
    }
  } else {
    // return error if user is not found
    return res.status(400).json({ error: "User not found" });
  }
}
