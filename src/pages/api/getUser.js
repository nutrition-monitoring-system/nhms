import prisma from "../../utils/prismaclientUtil.js"; // this is an import of an existing instance of the client
export default function Handle(req, res) {
  // this handles the login page
  // check to see if the user's email and password is valid
  const { email, password } = req.body;
  const userData = prisma.user.findMany({ where: { email: email } });
  if (userData && userData.password === password)
    return {
      id: userData.id,
      email: email,
      surname: userData.surname,
    };
  if (userData && userData.password !== password)
    return res.status(400).json({ error: "Password is not valid!" });

  return res.status(400).json({ error: "user not Found" });
}
