import prisma from "@/utils/prismaclientUtil";
export default async function handler(req, res) {
  if (req.method == "GET") {
    // Process a GET request
    const allSymptoms = await prisma.symptoms.findMany({
        select: {
          symptom_id: true,
          symptom_name: true
        },
      });
      return res.status(200).send(allSymptoms);
  } else {
    // bad request
    res.status(400).json({ error: "Bad request. Wrong request method" });
  }
}
