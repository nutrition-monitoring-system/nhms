import prisma from "../../utils/prismaclientUtil.js"; // this is an import of an existing instance of the client

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { email } = req.body;
      if (email) {
        try {
          const userData = await prisma.user.findFirst({ where: { email: email } });
          if (!userData) {
            return res.status(404).json({ error: "User not found." });
          }
          await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              is_admin: !userData.is_admin
            },
          });
          return res.status(200).json({ok: true});
        } catch (error) {
          return res.status(500).json({ error: "Internal server error." });
        }
      } else {
        return res.status(404).json({ error: "Email undefined." });
      }
    } else {
      return res.status(400).json({ error: "Wrong HTTP method." });
    }
  }
  