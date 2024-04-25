/* This route gets all the user's food logs. This returns the user's logs as a list.*/
import prisma from "../../../utils/prismaclientUtil";
export default async function handler(req, res) {
  if (req.method == "GET") {
    // Process a GET request
    const { userID, keyword } = req.body;
    if (keyword == null) {
      return res.status(500).json({ error: "Missing keyword." });
    }
    if (userID) {
      if (keyword == "food") {
        let getLogIDs = await prisma.log.findMany({
          where: { user_UserID: userID, logType: keyword },
          select: {
            logID: true,
            timestamp: true,
            FoodLog: {
              select: {
                food_foodID: false,
                foodID: false,
                foodQuantity: true,
              },
            },
          },
        });

        return res.status(200).json({ ok: true, logs: getLogIDs });
      } else if (keyword == "water") {
        let getLogIDs = await prisma.log.findMany({
          where: { user_UserID: userID, logType: keyword },
          select: {
            logID: true,
            timestamp: true,
            WaterLog: {
              select: {
                waterAmount: true,
              },
            },
          },
        });
        return res.status(200).json({ ok: true, logs: getLogIDs });
      }
      else if (keyword == "symptom"){
        let getLogIDs = await prisma.log.findMany({
          where: { user_UserID: userID, logType: keyword },
          select: {
            logID: true,
            timestamp: true,
            SymptomLog: {
              select: {
                symptom: true,
                intensity: true,
              },
            },
          },
        });
        return res.status(200).json({ ok: true, logs: getLogIDs });
      }
      else{
        let getLogIDs = await prisma.log.findMany({
          where: { user_UserID: userID, logType: keyword },
          select: {
            logID: true,
            timestamp: true,
          },
        });
        return res.status(200).json({ ok: true, logs: getLogIDs });
      }
    } else {
      return res.status(500).json({ error: "Missing user ID." });
    }
  } else {
    // bad request
    return res.status(400).json({ error: "Bad request. Wrong request method" });
  }
}
