/* Create a new collection, with a specific name, for a specific user. */
import { v1 } from "uuid";
import prisma from "../../utils/prismaclientUtil.js";
export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body) {
      // Process a POST request
      let newUUID = v1().slice(0, 32);
      // getting the data needed for the right table
      const { collectionName, userID } = req.body;

      /* Check if a valid user exists. */

      const checkUser = await prisma.user.findFirst({
        where: { userID: userID },
      });

      if (checkUser == null) {
        return res.status(501).json({ error: "User does not exist." });
      }
      /* The condition must be true to add a new symptom. */
      console.log(
        `Finding if there is a new collection called ${collectionName} already.`
      );

      const checkCollectionName = await prisma.collection.findFirst({
        where: { collectionName: collectionName, userUserID: userID },
      });

      /* If there is not already a collection name with this name, then: */
      if (checkCollectionName == null) {
        /* Create a new collection name, with a new ID. */
        console.log("Creating a new collection.");
        let newCollection = await prisma.collection.create({
          data: {
            userUserID: userID,
            collectionID: newUUID,
            collectionName: collectionName,
          },
        });
        console.log(`Added new collection to database.`);
        return res.status(200).json({ ok: true, collectionID: newUUID });
      }
      console.log(`Collection already exists.`);
      return res
        .status(404)
        .json({ error: `Collection name ${collectionName} already exists.` });
    }
    return res.status(501).json({ error: "Nothing in body." });
  }
  return res.status(400).json({ error: "Wrong HTTP method." });
}
