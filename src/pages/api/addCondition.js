/* Get user information and add it to the SQL database using MySQL.  */
import { v1 } from "uuid";
import prisma from "../../utils/prismaclientUtil.js";

export default async function handler(req, res) {
  // this handles the register page
  if (req.method === "POST") {
    if (req.body) {
      // Process a POST request
      let newUUID = v1().slice(0, 32);
      // getting the data needed for the right table
      const { conditionName } = req.body;

      /* Check if condition is in the database.  */

      const checkCondition = await prisma.chronic_condition.findFirst({
        where: { Condition_Type: conditionName },
      });

      /* The condition must be true to add a new symptom. */
      if (checkCondition == null) {
        console.log(`Adding condition ${conditionName} to database.`);
        const newCondition = await prisma.chronic_condition
          .create({
            data: {
              ChronicID: newUUID,
              Condition_Type: conditionName,
            },
          })
          .then(() => {
            console.log("Condition added to database.");
            return res.status(201).json({ ok: "true" });
          })
          .catch(() => {
            res.status(404).json({ error: "Unable to add condition." });
          });
      }
      console.log("Condition already in database.");
      return res.status(202).json({ ok: "true" });
    }
    return res.status(404).json({ error: "Nothing in body." });
  }
  // return an invalid response if user does not exist
  return res.status(501).json({ error: "Wrong HTTP method." });
}
