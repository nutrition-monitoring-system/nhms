
export default async function handler(req, res) {
    if (req.method == "GET") {
      // Process a GET request
      return res.status(200).send("API on.");
    } else {
      // bad request
      res.status(400).json({ error: "Bad request. Wrong request method" });
    }
  }
  