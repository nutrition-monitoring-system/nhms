import prisma from "@/utils/prismaclientUtil";
import { v1 } from "uuid";
// const fetchNutrition = () => {
//   const nutrition = [];
//   const url = `https://world.openfoodfacts.net/api/v2/search?fields=product_name,nutriments,nutriscore_data,vitamins_tags,allergens&countries_tags_en='uk'&page=2&page_size=20`;

//   fetch(url)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       const products = data.products;
//       let i = 0;
//       for (let product of products) {
//         if (
//           product.nutriscore_data != undefined &&
//           product.product_name != ""
//         ) {
//           nutrition.push({
//             name: product.product_name,
//             energy: product.nutriments["energy_100g"],
//             fat: product.nutriments["fat_100g"],
//             saturated_fat: product.nutriments["saturated-fat_100g"],
//             carbohydrate: product.nutriments["carbohydrates_100g"],
//             sugar: product.nutriments["sugars_100g"],
//             protein: product.nutriments["proteins_100g"],
//             salt: product.nutriments["salt_100g"],
//             vitamins: product.vitamins_tags,
//             allergens: product.allergens,
//             isDrink: product.nutriscore_data["is_beverage"],
//           });
//         } else {
//           console.log(`Problem with ${product.product_name}\n`);
//         }
//       }
//       console.log(nutrition);
//     });
// };

// // fetchNutrition();

export default async function handler(req, res) {
  /* This API route populates the database with foods.  */
  const openFoodFacts = `https://world.openfoodfacts.net/api/v2/search?fields=product_name,nutriments,nutriscore_data,vitamins_tags,allergens,serving_quantity,serving_quantity_unit,completeness&countries_tags_en='uk'&page=2&page_size=`;

  if (req.method === "GET") {
    /* Get a product name + the nutritional values */
    try {
      const nutrition = [];
      let numberOfEntries = 10;
      if (req.body.numberOfEntries != null) {
        numberOfEntries = req.body.numberOfEntries;
      }

      fetch(openFoodFacts + numberOfEntries.toString())
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          const products = data.products;
          let i = 0;
          for (let product of products) {
            if (
              product.nutriscore_data != undefined &&
              product.product_name != "" &&
              product["serving_quantity_unit"] === "g"
            ) {
              /* Any food added must be in grams, and have the nutritional information in grams. */
              let checkName = await prisma.food.findFirst({
                where: {
                  foodName: product.product_name,
                },
              });
              /* If the name is equal to null then add it to the db */
              if (checkName == null) {
                nutrition.push({
                  name: product.product_name,
                  energy: product.nutriments["energy_100g"],
                  fat: product.nutriments["fat_100g"],
                  saturated_fat: product.nutriments["saturated-fat_100g"],
                  carbohydrates: product.nutriments["carbohydrates_100g"],
                  sugar: product.nutriments["sugars_100g"],
                  protein: product.nutriments["proteins_100g"],
                  salt: product.nutriments["salt_100g"],
                  vitamins: product.vitamins_tags,
                  allergens: product.allergens,
                  isDrink: product.nutriscore_data["is_beverage"],
                  servingSize: parseInt(product["serving_quantity"]),
                  servingSizeType: product["serving_quantity_unit"],
                });
                try {
                  let addToFood = await prisma.food.create({
                    data: {
                      foodID: v1().slice(0, 32),
                      foodName: product.product_name,
                      calcium: 0,
                      carbohydrates: product.nutriments["carbohydrates_100g"],
                      isDrink: Boolean(product.nutriscore_data["is_beverage"]),
                      fat: product.nutriments["fat_100g"],
                      iron: 0,
                      protein: product.nutriments["proteins_100g"],
                      sugar: product.nutriments["sugars_100g"],
                      potassium: 0,
                      fibre: 0,
                      sodium: 0,
                      vitamins: 0,
                    },
                  });
                } catch {
                  console.log("Unable to add item to db.");
                }
              }
            }
          }
          console.log(
            `${nutrition.length} / ${numberOfEntries} to be added to database.`
          );
          return res.status(200).json({ ok: true });
        });
    } catch (error) {
      return res.status(500).json({ error: "Error with fetch request." });
    }
  } else {
    return res.status(400).json({ error: "Wrong request method!" });
  }
}
