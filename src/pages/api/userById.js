import prisma from "../../utils/prismaclientUtil.js"; // this is an import of an existing instance of the client

export default async function handler(req, res) {

  /* This request checks to see if an id is in the database. If so, it returns a specific user. */
  /* The request body must be in a json format, getting the id. */
  const { id } = req.body;
  console.log(id)
  if (id) {
    const userData = await prisma.user.findFirst({ where: {userID: id } });
    if (userData) {
      return res.status(200).json({
        ok: "true",
        id: userData.userID,
        name: userData.forename,
        surname: userData.surname,
        dob: userData.dob,
        gender: userData.gender,
      });
    
    }
    
  }
  return res.status(400).json({ error: `User not found with id ${id}` });
}
