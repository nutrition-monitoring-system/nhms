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
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 sm:gap-3 w-[80%] xl:w-[60%] min-h-fit pt-10 sm:w-full">
          {recipesList?.map((item, idx) => (
            <div key={idx}>
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
      <div className=" shadow-xl bg-white rounded-md flex flex-col gap-1 overflow-hidden p-1">
        <div
          className="rounded-md overflow-hidden bg-cover cursor-pointer transition-colors duration-1000 ease-in-out
        hover:bg-[url('/photos/food.jpeg')] bg-gradient-to-r from-rose-500 via-rose-500 to-sky-500 grid place-items-center p-5"
        >
          <div className="text-center font-sans font-extrabold text-[1.5rem] text-white">
            {recipe.name}
          </div>
        </div>
        <div className="">
          <div className="text-sm bg-rose-100 shadow-lg grid place-items-center p-2 rounded-md">
            <div className="flex justify-around items-center w-full">
              <img
                src="/icons/info.png"
                alt="information icon"
                width={30}
                height={30}
                className="bg-white rounded-[50px] p-1"
              />
              <img
                src="/icons/add.png"
                alt="Add icon"
                width={30}
                height={30}
                className="bg-white rounded-[50px] p-1"
              />
            </div>
            <div className="text-center flex justify-around items-center w-full">
              <span>Prep time</span> <span>{recipe.prep_time}</span>
            </div>
            <div className="text-center flex justify-around items-center w-full">
              <span>Cook time</span> <span>{recipe.cooking_time}</span>
            </div>
            <div className="text-center flex justify-around items-center w-full">
              <span>Meal type</span> <strong>BreakFast</strong>
            </div>
          </div>
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
