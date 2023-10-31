/* Get user information and add it to the SQL database using MySQL.  */
import {v1} from 'uuid';
export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    let newUUID = v1().slice(0, 32);
    let newUserData = JSON.stringify(req.body);
    res.send(newUUID);
  }
  else{
    res.status(400).json();
  }
}
