/* This method needs to create a new food log. This is done by first creating a new log item, with a unique log ID, the userID, the timestamp, which defaults to now if not put in, and setting the log type as food. */

/* After this logID is created, then a new foodLog will be created, that links the food item, and the log.*/
import { v1 } from "uuid";
import prisma from "../../../utils/prismaclientUtil";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // Process a POST request
    if (req.body) {
      let { userID, timestamp, food} = req.body;
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
        timestamp = new Date.now()
        console.log(`${timestamp} is set to now.`)
      }



      let newLogID = v1().slice(0, 32);

      console.log(newLogID);

      return res.status(200).send("API on.");
    } else {
      res.status(404).json({ error: "Nothing present in body." });
    }
  } else {
    // bad request
    res.status(501).json({ error: "Bad request. Wrong request method." });
  }
}
