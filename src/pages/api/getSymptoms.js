import prisma from "@/utils/prismaclientUtil";
export default async function handler(req, res) {
  if (req.method == "GET") {
    // Process a GET request
    const allSymptoms = await prisma.symptom.findMany({
        select: {
          symptomID: true,
          symptomName: true
        },
      });
      return res.status(200).send(allSymptoms);
  } else {
    // bad request
    res.status(400).json({ error: "Bad request. Wrong request method" });
  }
}
