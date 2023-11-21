"use client";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipesList, setRecipeList] = useState([]);
  useEffect(() => {
    (function RequestRecipes() {
      fetch("/api/getRecipes")
        .then((response) => response.json())
        .then((data) => setRecipeList([...data.Breakfast]));
    })();
  }, []);

  return (
    <>
      {recipesList.length === 0 ? (
        <RecipeLoadingSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-5 w-[80%] min-h-fit pt-10 sm:w-full">
          {recipesList?.map((item, idx) => (
            <div key={idx} className="aspect-w-1 aspect-h-1">
              <RecipeInfo recipe={item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function RecipeInfo({ recipe }) {
  return (
    <>
      <div className="w-full h-full sm:w-[80%] shadow-xl bg-white rounded-md grid grid-rows-2 overflow-hidden p-1">
        <div className="rounded-md overflow-hidden bg-cover bg-rose-500 bg-[url('data:image/jpeg;base64,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')]"></div>
        <div className="text-sm grid-rows-3 place-items-center m-2 gap-3">
          <div className="font-extrabold text-center text-[15px]">
            {recipe.name}
          </div>
          <div className="text-center grid grid-cols-2">
            <span>Prep time:</span> <span>{recipe.prep_time}</span>
          </div>
          <div className="text-center grid grid-cols-2">
            <span>Cook time:</span> <span>{recipe.cooking_time}</span>
          </div>
          <div className="text-center grid grid-cols-2">
            <span>Meal type:</span> <span>BreakFast</span>
          </div>
          {/* <div className="bg-primary"></div> */}
        </div>
      </div>
    </>
  );
}

function RecipeInfoEmpty() {
  return (
    <>
      <div className="min-h-[150px] h-fit sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md grid grid-rows-2"></div>
    </>
  );
}

function RecipeLoadingSkeleton() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-4 w-[70%] min-h-fit pt-10 sm:w-full">
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
    </div>
  );
}
