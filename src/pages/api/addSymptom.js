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
      const { symptomName } = req.body;

      /* The condition must be true to add a new symptom. */
      console.log(`Adding new symptom ${symptomName}.`);

      const checkSymptom = await prisma.symptom.findFirst({
        where: { symptomName: symptomName },
      });
      
      if (checkSymptom == null) {
        const newSymptom = await prisma.symptom
          .create({
            data: {
              symptomID: newUUID,
              symptomName: symptomName,
            },
          })
          .then(() => {
            console.log("Symptom added to database.");
            return res.status(201).json({ ok: "true" });
          })
          .catch(() => {
            return res.status(404).json({ error: "Unable to add symptom." });
          });
      }
      console.log("Symptom already in database.");
      return res.status(202).json({ ok: "true" });
    }
    // return an invalid response if user does not exist
    return res.status(404).json({ error: "Nothing in request body." });
  }
  return res.status(501).json({ error: "Wrong HTTP method." });
}
