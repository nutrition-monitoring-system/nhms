import prisma from "../../utils/prismaclientUtil.js"; // this is an import of an existing instance of the client

export default async function handler(req, res) {
  /* This request checks to see if the user is an admin.
   If so, it returns okay. */
  /* The request body must be in a json format, getting the id. */
  if (req.method === "POST") {
    const { id } = req.body;
    // console.log(id)
    if (id) {
      const userData = await prisma.user.findFirst({ where: { userID: id } });
      /* Any cases where a user with the id exists. */
      if (userData.isAdmin == 1) {
        /* The user is an admin. */
        return res.status(200).json({
          ok: "true",
        });
      } else {
        /* The user is not an admin. */
        return res.status(500).json({ error: `User is not admin.` });
      }
    }
    /* The id field is not given or is undefined. */
    return res.status(404).json({ error: `ID undefined.` });
  }
/* The wrong HTTP method is used. */
  return res.status(400).json({ error: "Wrong HTTP method." });
}
