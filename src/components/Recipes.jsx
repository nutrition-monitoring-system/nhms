"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Recipes({ recipesList }) {
  const [currentRecipe, setCurrentRecipe] = useState({});
  return (
    <>
      {recipesList.length === 0 ? (
        <RecipeLoadingSkeleton />
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-3 w-[80%] xl:W-[65%] min-h-fit pt-10 sm:w-full">
          <RecipesModal currentRecipe={currentRecipe} />
          {recipesList?.map((item, idx) => (
            <div key={idx}>
              <RecipeInfo
                recipe={item}
                setCurrentRecipe={() => setCurrentRecipe(item)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function RecipesModal({ currentRecipe }) {
  const modal = useRef(null);

  useEffect(() => {
    modal.current.showModal();
    console.log(currentRecipe);
  }, [currentRecipe]);

  return (
    <>
      <dialog ref={modal} className="w-[50%] h-[80%] rounded-lg">
        <div className="w-full h-full grid grid-rows-2 p-2 bg-rose-100">
          <div className="bg-white rounded-md shadow-md">
            <div className="flex justify-around items-center p-3">
              <h1 className="text-center font-black text-[1.5rem]">
                {currentRecipe.name}
              </h1>
              <button
                className="tile bg-black text-white focus:outline-none"
                onClick={() => modal.current.close()}
              >
                <span>close</span>
              </button>
            </div>
          </div>
          <div className="shadow-lg rounded-md"></div>
        </div>
      </dialog>
    </>
  );
}

function RecipeInfo({ recipe, setCurrentRecipe }) {
  return (
    <>
      <div className=" shadow-xl bg-rose-100 rounded-md flex flex-col gap-1 overflow-hidden p-1">
        <div
          className="rounded-md overflow-hidden bg-cover cursor-pointer transition-colors duration-1000 ease-in-out
        bg-white grid place-items-center p-5 shadow-lg"
        >
          <div className="text-center font-sans font-extrabold text-[1.5rem] text-black">
            {recipe.name}
          </div>
        </div>
        <div className="">
          <div className="text-sm bg-rose-100 shadow-xl grid place-items-center p-2 rounded-md">
            <div className="flex justify-around items-center w-full">
              <Image
                src="/icons/info.png"
                alt="information icon"
                width={30}
                height={30}
                className="bg-white rounded-[50px] p-1 cursor-pointer"
                onClick={setCurrentRecipe}
              />
              <Image
                src="/icons/add.png"
                alt="Add icon"
                width={30}
                height={30}
                className="bg-white rounded-[50px] p-1 cursor-pointer"
              />
            </div>
            <div className="text-center flex justify-around items-center w-full">
              <span>Prep time</span> <span>{recipe.prep_time}</span>
            </div>
            <div className="text-left flex justify-around items-center w-full">
              <span>Cook time</span> <span>{recipe.cooking_time}</span>
            </div>
            <div className="text-left flex justify-around items-center w-full">
              <span>Meal type</span> <strong>Breakfast</strong>
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
    </div>
  );
}
