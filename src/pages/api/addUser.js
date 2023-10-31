/* Get user information and add it to the SQL database using MySQL.  */
import {v1} from 'uuid';
import { PrismaClient } from '@prisma/client';
export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    let newUUID = v1().slice(0, 32);
    let newUserData = JSON.stringify(req.body);
    /* Create a new user in the database. */
    res.send(newUUID);
    res.status(200).json();
  }
  else{
    res.status(400).json();
  }
}
