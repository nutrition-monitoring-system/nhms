import prisma from "../../utils/prismaclientUtil.js"; // this is an import of an existing instance of the client
import CryptoJS from "crypto-js";
export default function Handle(req, res) {
  // this handles the login page
  // check to see if the user's email and password is valid
  const { email, password } = req.body;
  const userData = prisma.user.findMany({ where: { email: email } });
  // Hash the password using SHA-256
  const hash = CryptoJS.SHA256(password);
  // Convert the hash to a hexadecimal string
  const passwordHash = hash.toString(CryptoJS.enc.Hex).substring(0, 30);
  console.log(userData.password === passwordHash);
  if (userData && userData.password === passwordHash)
    // if the user is valid then we want to return data back to the session
    return {
      id: userData.id,
      email: email,
      surname: userData.surname,
    };
  if (userData && userData.password !== password)
    return res.status(400).json({ error: "Password is not valid!" });

  return res.status(400).json({ error: "user not Found" });
}
