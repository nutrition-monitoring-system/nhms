/* This method needs to create a new food log. This is done by first creating a new log item, with a unique log ID, the userID, the timestamp(MUST BE IN AN ISO FORMAT), which defaults to now if not put in, and setting the log type as food. */

/* After this logID is created, then a new foodLog will be created, that links the food array, and the log.

The food array is structured in a way so that you can add the nutrition values. */
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

        console.log(newLogID);

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
            if (response != null) {
              let newFoodEntry = await prisma.foodLog.create({
                data: {
                  food_foodID: v1().slice(0, 32),
                  log_logID: newLogID,
                  foodQuantity: food.foodQuantity,
                },
              });
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
