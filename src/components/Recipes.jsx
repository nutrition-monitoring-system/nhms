"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Recipes(props) {
  const { recipesList, searchInformation, setSearchInformation } = props;
  const [currentRecipe, setCurrentRecipe] = useState({});

  return (
    <>
      {recipesList.length === 0 ? (
        <RecipeLoadingSkeleton />
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-3 w-[80%] xl:w-[70%] min-h-fit pt-10 sm:w-full">
          <RecipesModal recipe={currentRecipe} />
          {recipesList
            ?.filter((item) =>
              item.name.toLowerCase().includes(searchInformation.toLowerCase())
            )
            .map((item, idx) => (
              <div key={idx}>
                <RecipeInfo
                  {...props}
                  customColor={"green-100"}
                  recipe={item}
                  setCurrentRecipe={setCurrentRecipe}
                />
              </div>
            ))}
          <RenderRecipeSection {...props} setCurrentRecipe={setCurrentRecipe} />
        </div>
      )}
    </>
  );
}

function RenderRecipeSection(props) {
  const { currentSectionName, currentSectionList, recipesList } = props;
  switch (currentSectionName) {
    case "Recipes":
      return recipesList?.map((item, idx) => (
        <div key={idx}>
          <RecipeInfo {...props} recipe={item} />
        </div>
      ));
    case "Collections":
      return recipesList
        ?.filter((item) => currentSectionList.includes(item.name))
        .map((item, idx) => (
          <div key={idx}>
            <RecipeInfo {...props} recipe={item} />
          </div>
        ));
    default:
      return recipesList?.map((item, idx) => (
        <div key={idx}>
          <RecipeInfo {...props} recipe={item} />
        </div>
      ));
  }
}

function RecipesModal({ recipe }) {
  const modal = useRef(null);

  useEffect(() => {
    // checking if the object is empty
    if (Object.keys(recipe).length !== 0) {
      modal.current.showModal();
    }
  }, [recipe]);
  return (
    <>
      <dialog ref={modal} className="w-[60%] min-h-[90%] rounded-lg">
        <div className="w-full h-full grid grid-rows-4 p-2 bg-rose-100">
          <div className="bg-white rounded-md shadow-md">
            <div className="flex justify-around items-center p-3">
              <h1 className="text-center font-black text-[1.5rem]">
                {recipe.name}
              </h1>
              <button
                className="tile bg-black text-white focus:outline-none"
                onClick={() => modal.current.close()}
              >
                <span>close</span>
              </button>
            </div>
          </div>
          <div className="rounded-md grid grid-cols-1 grid-rows-6 gap-2 row-span-3 py-5 overflow-y-scroll">
            <div className="grid grid-cols-2 place-items-center text-sm rounded-md shadow-md p-2">
              <div>Servings</div>
              <div className="font-black text-[3rem] bg-white h-full w-full rounded-md shadow-md grid place-items-center">
                {recipe.servings}
              </div>
            </div>
            <div className="grid grid-cols-2 place-items-center text-center text-sm rounded-md shadow-md p-2">
              <ul className="p-2 bg-white h-full w-full rounded-md shadow-md grid place-items-start gap-1">
                {recipe?.ingredients?.map((item, idx) => (
                  <ul
                    key={idx}
                    className="bg-gray-100 w-full text-left p-2 rounded-md shadow-md"
                  >
                    {item}
                  </ul>
                ))}
              </ul>
              <div>Ingredients</div>
            </div>
            <div className="grid grid-cols-2 place-items-center text-center text-sm rounded-md shadow-md p-2">
              <div>Prep Time</div>
              <div className="font-black text-[3rem] p-2 bg-white h-full w-full rounded-md shadow-md grid place-items-center">
                {recipe.prep_time}
              </div>
            </div>
            <div className="grid grid-cols-2 place-items-center text-center text-sm rounded-md shadow-md p-2">
              <div className="font-black text-[3rem] p-2 bg-white h-full w-full rounded-md shadow-md grid place-items-center">
                {recipe.cooking_time}
              </div>
              <div>Cook times</div>
            </div>
            <div className="grid grid-cols-2 place-items-center text-center text-sm rounded-md shadow-md p-2">
              <div>Directions</div>
              <div className="p-2 bg-white h-full w-full rounded-md shadow-md grid place-items-center">
                {recipe.directions}
              </div>
            </div>
            <div className="grid  grid-rows-2 grid-cols-4 gap-1 place-items-center text-center text-sm rounded-md shadow-md p-2">
              <div className="bg-white shadow-lg rounded-md w-full h-full col-span-full grid place-items-center">
                Nutrition
              </div>
              <div className="bg-white shadow-lg rounded-md w-full h-full grid grid-rows-2 place-items-center">
                <div>Calories</div>
                <div>{recipe?.nutrition?.calories}</div>
              </div>
              <div className="bg-white shadow-lg rounded-md w-full h-full grid grid-rows-2 place-items-center">
                <div>Carbohydrates</div>
                <div>{recipe?.nutrition?.carbohydates}</div>
              </div>
              <div className="bg-white shadow-lg rounded-md w-full h-full grid grid-rows-2 place-items-center">
                <div>Protein</div>
                <div>{recipe?.nutrition?.protein}</div>
              </div>
              <div className="bg-white shadow-lg rounded-md w-full h-full grid grid-rows-2 place-items-center">
                <div>Fat</div>
                <div>{recipe?.nutrition?.fat}</div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function RecipeInfo({
  recipe,
  customColor,
  setCurrentRecipe,
  currentSectionList,
  setCurrentSectionList,
}) {
  const [toogleAddCollections, setToogleAddCollections] =
    useState("/icons/add.png");
  const toogleIcon = () => {
    if (toogleAddCollections === "/icons/add.png") {
      setToogleAddCollections("/icons/check.png");
      setCurrentSectionList([...currentSectionList, recipe.name]);
    } else {
      setToogleAddCollections("/icons/add.png");
      const index = currentSectionList.indexOf(2);
      if (index > -1) {
        currentSectionList.splice(index, 1);
      }
      setCurrentSectionList(currentSectionList);
    }
  };

  return (
    <>
      <div
        className={
          `shadow-xl rounded-md flex flex-col gap-1 overflow-hidden p-1` +
          ` ${customColor ? `bg-${customColor}` : "bg-rose-100"}`
        }
      >
        <div
          className="rounded-md overflow-hidden bg-cover cursor-pointer transition-colors duration-1000 ease-in-out
        bg-white grid place-items-center p-5 shadow-lg"
        >
          <div className="text-center font-sans font-extrabold text-[1.5rem] text-black">
            {recipe.name}
          </div>
        </div>
        <div className="">
          <div
            className={
              `text-sm bg-rose-100 shadow-xl grid place-items-center p-2 rounded-md` +
              `${customColor}`
                ? `bg-${customColor}`
                : "bg-rose-100"
            }
          >
            <div className="flex justify-around items-center w-full">
              <Image
                src="/icons/info.png"
                alt="information icon"
                width={30}
                height={30}
                className="bg-white rounded-[50px] p-1 cursor-pointer"
                onClick={() => setCurrentRecipe(recipe)}
              />
              <Image
                src={toogleAddCollections}
                alt="Add icon"
                width={30}
                height={30}
                className="bg-white rounded-[50px] p-1 cursor-pointer"
                onClick={() => toogleIcon()}
              />
            </div>
            <div className="text-center flex justify-around items-center w-full">
              <span>Prep time</span> <span>{recipe.prep_time}</span>
            </div>
            <div className="text-left flex justify-around items-center w-full">
              <span>Cook time</span>{" "}
              <span>
                {!recipe.cooking_time ? "0 minutes" : recipe.cooking_time}
              </span>
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
    <div className="min-w-[25%] min-h-[200px] shadow-xl bg-rose-100 rounded-md grid grid-rows-2 gap-1 overflow-hidden p-1">
      <div
        className="rounded-md overflow-hidden bg-cover cursor-pointer transition-colors duration-1000 ease-in-out
    bg-white grid place-items-center p-5 shadow-lg"
      >
        <div className="text-center font-sans font-extrabold text-[1.5rem] text-black"></div>
      </div>
      <div className="">
        <div className="text-sm bg-rose-100 shadow-xl grid place-items-center p-2 rounded-md h-full">
          <div className="flex justify-around items-center w-full">
            <div className="bg-white w-[40px] h-[40px] rounded-full"></div>
            <div className="bg-white w-[40px] h-[40px] rounded-full"></div>
          </div>
          <div className="text-center flex justify-around items-center w-full"></div>
          <div className="text-left flex justify-around items-center w-full"></div>
          <div className="text-left flex justify-around items-center w-full"></div>
        </div>
      </div>
    </div>
  );
}

function RecipeLoadingSkeleton() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-4 w-[80%] min-h-fit pt-10 sm:w-full">
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
      <RecipeInfoEmpty />
    </div>
  );
}
