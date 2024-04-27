import prisma from "../../utils/prismaclientUtil.js";
import { v1 } from "uuid";
import {
  AllergiesInformation,
  Symptoms,
  chronicConditions,
  pinnedRecipes,
} from "@/utils/dataRegistration.js";
export default async function handler(req, res) {
  if (req.method == "POST") {
    /* Add all the symptoms to the database if not in there already. */
    try {
      /* For every allergy entry, if its not already in the database, then insert it. */
      console.log("Adding allergies to database.");
      AllergiesInformation.forEach(async ({ type }) => {
        const checkAllergy = await prisma.allergy
          .findFirst({
            where: {
              allergyType: type,
            },
          })
          .then(async (response) => {
            // console.log(response)
            if (response == null) {
              /* Add the new data into the database. */
              let addNewAllergy = await prisma.allergy.create({
                data: { allergyID: v1().slice(0, 32), allergyType: type },
              });
            }
          });
      });

      console.log("Adding chronic conditions to database.");

      chronicConditions.forEach(async ({ type }) => {
        const checkCondition = await prisma.chronicCondition
          .findFirst({
            where: {
              conditionType: type,
            },
          })
          .then(async (response) => {
            // console.log(response)
            if (response == null) {
              /* Add the new data into the database. */
              let addNewCondition = await prisma.chronicCondition.create({
                data: { chronicID: v1().slice(0, 32), conditionType: type },
              });
            }
          });
      });
      console.log("Adding Dr Gostic's recipes to database.");

      pinnedRecipes.forEach(async (recipeEntry) => {
        const checkRecipe = await prisma.recipe
          .findFirst({
            where: {
              recipeName: recipeEntry.name,
            },
          })
          .then(async (response) => {
            // console.log(response)
            if (response == null) {
              /* Add the new data into the database. */
              try {
                /* Doing it this way makes sure that no recipes with no directions are added. */
                let addNewRecipe = await prisma.recipe.create({
                  data: {
                    recipeID: v1().slice(0, 32),
                    recipeName: recipeEntry.name,
                    serving: recipeEntry.servings,
                    recipeType: recipeEntry.type,
                    recipeIngredients: recipeEntry.ingredients.join(","),
                    recipeInstructions: recipeEntry.directions,
                    cookTime: recipeEntry.cooking_time,
                    prepTime: recipeEntry.prep_time
                      ? recipeEntry.prep_time
                      : "0 minutes",
                    freezeTime: recipeEntry.freeze_time
                      ? recipeEntry.freeze_time
                      : "0 minutes",
                    calories: recipeEntry.nutrition["calories"],
                    carbohydrates: recipeEntry.nutrition["carbohydrates"],
                    fat: recipeEntry.nutrition["fat"],
                    protein: recipeEntry.nutrition["protein"],
                  },
                });
              } catch {
                console.log(`${recipeEntry.name} was unable to be added.`);
              }
            }
          });
      });

      console.log("Adding some common symptoms to the database.");

      Symptoms.forEach(async (symptom) => {
        const checkRecipe = await prisma.symptom
        .findFirst({
          where: {
            symptomName: symptom,
          },
        })
        .then(async (response) => {
          // console.log(response)
          if (response == null) {
            /* Add the new data into the database. */
            try {
              let addNewRecipe = await prisma.symptom.create({
                data: {
                  symptomID: v1().slice(0, 32),
                  symptomName: symptom.charAt(0).toUpperCase()
                  + symptom.slice(1)
                },
              });
            } catch {
              console.log(`${symptom} was unable to be added.`);
            }
          }
      })})

      console.log("Adding some foods from the OpenFoodFacts API to the database.")

      fetch("/api/getNutrition")
      console.log("Database populated.");
      return res.status(200).json({ ok: true });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Unable to populate database with default values." });
    }
  }
}
