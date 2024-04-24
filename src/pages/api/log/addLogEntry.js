/* This route will add a new log, depending on the type of log that is called, and depending on the parameters that are called. 

The two main parameters are the userID, and the keyword, which can be [food, water, menstrual, mood, symptom, photo]. 

The timestamp is an optional parameter. 
If the timestamp is not in the parameter, then the current timestamp of the message arriving will be added.

This route also requires a follow up parameter, that depends on the keyword; 
a food log will require a food name or an optional ID, 
whilst water would require the water quantity that has been drunken, etc.*/

import { v1 } from "uuid";
import prisma from "../../../utils/prismaclientUtil";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // Process a POST request
    if (req.body) {
      let { userID, timestamp, keyword } = req.body;

      let newLogID = v1().slice(0, 32);

      /* Check if userID is valid. */
      const checkUser = await prisma.user.findFirst({
        where: { userID: userID },
      });

      if (checkUser == null) {
        return res
          .status(501)
          .json({ error: `User ${userID} does not exist.` });
      }
      /* Check keyword presence. */

      if (keyword == null) {
        return res.status(404).json({
          error: "Keyword not found.",
        });
      }

      /* Check timestamp validity - should not be in the future. USE GET TIME FOR THIS.*/

      if (timestamp == null) {
        timestamp = new Date().toISOString();
        console.log(`Timestamp is set to ${timestamp}.`);
      }

      /* Convert timestamp to an actual date. */
      if (timestamp != null && typeof timestamp === "string") {
        let currentDate = new Date();
        timestamp = new Date(timestamp);
        if (timestamp.getTime() > currentDate.getTime()) {
          return res.status(404).json({
            error: "Timestamp cannot be in future.",
          });
        }
        // console.log(timestamp);
      }

      if (keyword === "food") {
        /* Get food item from the request. */
        if (req.body.food != null) {
          let food = req.body.food;

          /* Check if a food array is included in the request. */

          if (food.name == null && food.foodID == null) {
            return res.status(404).json({
              error: "Food array not in proper format.",
            });
          }

          /* Check if corresponding food exists in database. */

          let checkFood = await prisma.food.findFirst({
            where: {
              foodName: food.name,
            },
          });
          // console.log(checkFood);
          if (checkFood == null) {
            /* Create new food if does not exist. */
            console.log("Food will be created.");
            let newFoodID = v1().slice(0, 32);

            try {
              let newFood = await prisma.food.create({
                data: {
                  foodID: newFoodID,
                  foodName: food.name,
                  isDrink: false,
                  calcium: food.calcium ? food.calcium : 0,
                  carbohydrates: food.carbohydrates ? food.carbohydrates : 0,
                  fat: food.fat ? food.fat : 0,
                  fibre: food.fibre ? food.fibre : 0,
                  iron: food.iron ? food.iron : 0,
                  potassium: food.potassium ? food.potassium : 0,
                  protein: food.protein ? food.protein : 0,
                  sodium: food.sodium ? food.sodium : 0,
                  sugar: food.sugar ? food.sugar : 0,
                  vitamins: food.vitamins ? food.vitamins : 0,
                },
              });
              checkFood = newFood;
              console.log("Created new food.");
            } catch {
              return res.status(404).json({
                error:
                  "Problem with food values entered. Values may be missing.",
              });
            }
          } else {
            console.log("Found food: ");
            // console.log(checkFood);
          }
          /* Carry on with logging new food, as now new food should be valid. */
          try {
            console.log("Creating new food entry.");
            const newLog = await prisma.log
              .create({
                data: {
                  logID: newLogID,
                  logType: "food",
                  timestamp: timestamp,
                  user_UserID: userID,
                },
              })
              .then(async (response) => {
                /* Check if food exists or not. */
                if (response != null) {
                  let newFoodLogEntry = await prisma.foodLog.create({
                    data: {
                      food_foodID: checkFood.foodID,
                      log_logID: newLogID,
                      foodQuantity: food.foodQuantity,
                    },
                  });
                }
              });
          } catch (error) {
            return res
              .status(404)
              .json({ error: `Problem with adding a log entry. ${error}` });
          }

          return res.status(200).json({ ok: true });
        }
        return res.status(404).json({ error: "No food value(s) present." });
      } else if (keyword === "water") {
        /* Add water log items here. */

        if (req.body.water != null) {
          let water = req.body.water;
          /* Create a new log which saves the water content. */

          const newLog = await prisma.log
            .create({
              data: {
                logID: newLogID,
                logType: "water",
                timestamp: timestamp,
                user_UserID: userID,
              },
            })
            .then(async (response) => {
              /* Check if food exists or not. */
              let newWaterLogEntry = await prisma.waterLog.create({
                data: {
                  log_logID: newLogID,
                  waterAmount: water.waterAmount,
                },
              });
            });

          return res.status(200).json({ ok: true });
        } else {
          return res
            .status(404)
            .json({ error: "Problem with water entry entered." });
        }
      } else if (keyword === "symptom") {
        if (req.body.symptom != null) {
          let symptom = req.body.symptom;
          /* Create a new log which saves the symptom content. */

          /* Get name for the symptom. */

          const firstSymptom = await prisma.symptom.findFirst({
            where: {
              symptomName: symptom.name,
            },
            select: {
              symptomID: true,
              symptomName: true,
            },
          });

          const newLog = await prisma.log
            .create({
              data: {
                logID: newLogID,
                logType: "symptom",
                timestamp: timestamp,
                user_UserID: userID,
              },
            })
            .then(async (response) => {
              /* Check if food exists or not. */
              let newSymptomLogEntry = await prisma.symptomLog.create({
                data: {
                  log_logID: newLogID,
                  intensity: symptom.intensity,
                  symptom_symptomID: firstSymptom.symptomID,
                },
              });
            });

          return res.status(200).json({ ok: true });
        } else {
          return res
            .status(404)
            .json({ error: "Problem with symptom entry entered." });
        }
      } else {
        return res
          .status(404)
          .json({ error: "Invalid keyword sent in request." });
      }
    } else {
      return res.status(404).json({ error: "Parameters not present in body." });
    }
  } else {
    // bad request
    return res
      .status(501)
      .json({ error: "Bad request. Wrong request method." });
  }
}
