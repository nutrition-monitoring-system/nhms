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
      const { conditionName, symptomName } = req.body;

      /* Check if condition is in the database.  */

      const checkCondition = await prisma.chronic_condition.findFirst({
        where: { Condition_Type: conditionName },
      });

      const checkSymptom = await prisma.symptoms.findFirst({
        where: { symptom_name: symptomName },
      });

      /* The condition must be true to add a new symptom. */
      if (checkCondition != null || checkCondition != undefined) {
        console.log(`Condition ${conditionName} is in database.`);
        console.log(`Adding new symptom ${symptomName}.`);

        if (checkSymptom == null) {
          const newSymptom = await prisma.symptoms
            .create({
              data: {
                symptom_name: symptomName,
                symptom_id: newUUID,
              },
            })
            .then(async () => {
              const newJunction = await prisma.scc_junction.create({
                data: {
                  junctionid: v1().slice(0, 32),
                  scc_chronicID: checkCondition.ChronicID,
                  scc_symptomID: newUUID,
                },
              });
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
      } else {
        /* Create a symptom if the condition is not present. */
        if (checkSymptom == null) {
          const newSymptom = await prisma.symptoms
            .create({
              data: {
                symptom_name: symptomName,
                symptom_id: newUUID,
              },
            })
            .then(() => {
              console.log("Symptom added to database.");
              return res.status(201).json({ ok: "true" });
            });
        }
        res.status(404).json({ error: "Could not find condition." });
      }
    }
    return res.status(404).json({ error: "Nothing in body." });
  }
  // return an invalid response if user does not exist
  return res.status(501).json({ error: "Wrong HTTP method." });
}
