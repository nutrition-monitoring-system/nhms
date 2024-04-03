/* This route gets all the user's food logs. */
import prisma from "../../../utils/prismaclientUtil";
export default async function handler(req, res) {
  if (req.method == "GET") {
    // Process a GET request
    const { userID } = req.body;
    if (userID) {
      let getFoodLogIDs = await prisma.log.findMany({
        where: { user_UserID: userID, logType: "food" },
      });
      console.log(getFoodLogIDs);

      return res.status(200).json({ ok: true, logs: [] });
    } else {
      return res.status(500).json({ error: "Missing user ID." });
    }
  } else {
    // bad request
    return res.status(400).json({ error: "Bad request. Wrong request method" });
  }
}
