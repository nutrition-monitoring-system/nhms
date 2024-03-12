import prisma from "../../utils/prismaclientUtil.js";
import { v1 } from "uuid";
import {
  AllergiesInformation,
  chronicConditions,
} from "@/utils/dataRegistration.js";
export default async function handler(req, res) {
  if (req.method == "POST") {
    /* Add all the symptoms to the database if not in there already. */
    try {
      /* For every allergy entry, if its not already in the database, then insert it. */
      console.log("Adding allergies to database.");
      AllergiesInformation.forEach(async ({ type }) => {
        const checkAllergy = await prisma.allergy
          .findFirst({
            where: {
              allergyType: type,
            },
          })
          .then(async (response) => {
            // console.log(response)
            if (response == null) {
              /* Add the new data into the database. */
              let addNewAllergy = await prisma.allergy.create({
                data: { allergyID: v1().slice(0, 32), allergyType: type },
              });
            }
          });
      });

      console.log("Adding chronic conditions to database.");

      chronicConditions.forEach(async ({ type }) => {
        const checkCondition = await prisma.chronicCondition
          .findFirst({
            where: {
              conditionType: type,
            },
          })
          .then(async (response) => {
            // console.log(response)
            if (response == null) {
              /* Add the new data into the database. */
              let addNewCondition = await prisma.chronicCondition.create({
                data: { chronicID: v1().slice(0, 32), conditionType: type },
              });
            }
          });
      });

      console.log("Database populated.");
      return res.status(200).json({ ok: true });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Unable to populate database with default values." });
    }
  }
}
