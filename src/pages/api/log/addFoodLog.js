/* This method needs to create a new food log. This is done by first creating a new log item, with a unique log ID, the userID, the timestamp(MUST BE IN AN ISO FORMAT), which defaults to now if not put in, and setting the log type as food. */

/* After this logID is created, then a new foodLog will be created, that links the food array, and the log.

The food array is structured in a way so that you can add the custom nutrition values, otherwise it results in 0. */
import { v1 } from "uuid";
import prisma from "../../../utils/prismaclientUtil";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // Process a POST request
    if (req.body) {
      let { userID, timestamp, food } = req.body;
      if (food) {
        /* Check if userID is in the database already. */
        const checkUser = await prisma.user.findFirst({
          where: { userID: userID },
        });

        if (checkUser == null) {
          return res
            .status(501)
            .json({ error: `User ${userID} does not exist.` });
        }

        if (timestamp == null) {
          timestamp = new Date().toISOString();
          console.log(`${timestamp} is set to now.`);
        }

        let newLogID = v1().slice(0, 32);

        // console.log(newLogID);

        /* Create the new food first. */

        /* Create the food log entry. */

        /* Create the log entry.*/

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
              let newFoodID = v1().slice(0, 32);
              try {
                /* Check if food name already exists. */
                let checkFood = await prisma.food.findFirstOrThrow({
                  where: {
                    foodName: food.foodName,
                  },
                });
                newFoodID = checkFood.foodID;
              } catch (error) {
                try {
                  let newFood = await prisma.food.create({
                    data: {
                      foodID: newFoodID,
                      foodName: food.foodName,
                      isDrink: false,
                      sodium: food.sodium,
                      protein: food.protein,
                      fat: food.fat,
                      vitamins: food.vitamins,
                      calcium: food.calcium,
                      iron: food.iron,
                      carbohydrates: food.carbohydrates,
                      potassium: food.potassium,
                      fibre: food.fibre,
                      sugar: food.sugar,
                    },
                  });
                  console.log(
                    `New food added with name ${food.foodName}, and ID ${newFoodID}`
                  );
                } catch {
                  return res.status(500).json({
                    error:
                      "Food not in correct format. Food must be an Object and have the name and the quantity.",
                  });
                }
              }
              finally{

                let newFoodLogEntry = await prisma.foodLog.create({
                  data: {
                    food_foodID: newFoodID,
                    log_logID: newLogID,
                    foodQuantity: food.foodQuantity,
                  },
                });
              }
            }
          });

        return res.status(200).json({ ok: true });
      }
      return res.status(404).json({ error: "No food value(s) present." });
    } else {
      res.status(404).json({ error: "Nothing present in body." });
    }
  } else {
    // bad request
    res.status(501).json({ error: "Bad request. Wrong request method." });
  }
}
