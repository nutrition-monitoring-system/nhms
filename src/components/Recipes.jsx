"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
export default function Recipes(props) {
  const { recipesList, searchInformation, setSearchInformation } = props;
  const [currentRecipe, setCurrentRecipe] = useState({});

  return (
    <>
      {recipesList.length === 0 ? (
        <></>
      ) : (
        <div className="grid grid-cols-1 justify-center items-start p-2 md:grid-cols-1 md:px-10 w-[70%] h-fit min-h-3/4 sm:w-full">
          <RecipesModal recipe={currentRecipe} />
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
            <RecipeInfo {...props} recipe={item} check={true} />
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
    console.log(recipe);
    if (Object.keys(recipe).length !== 0) {
      modal.current.showModal();
    }
  }, [recipe]);

  return (
    <>
      <dialog
        ref={modal}
        className="w-[50%] md:w-screen md:h-screen h-fit rounded-lg p-3 bg-primarylight focus:outline-none"
      >
        <div className="sticky top-0 flex items-center justify-end py-1 px-7">
          <button
            className="shadow-md focus:ring-0 tile"
            onClick={() => modal.current.close()}
          >
            <Image
              alt="the plus icon representing close"
              src={"/icons/add.png"}
              className="rotate-45"
              width={20}
              height={20}
            />
            Close
          </button>
        </div>
        <article class="prose lg:prose-xl mx-auto prose-gray p-4">
          <h1 className="text-center">{recipe.name}</h1>
          <div className="flex flex-wrap items-center justify-between p-1 text-lg">
            <strong className="">Servings</strong>
            <div className="p-2 border-r-2">{recipe.servings || 0}</div>
            <strong className="">Prep Time</strong>
            <div className="px-4 border-r-2">
              {recipe.prep_time || "0 minutes"}
            </div>
            <strong className="">Cook Time</strong>
            <div className="">{recipe.cooking_time || "0 minutes"}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1">
            <div>
              <h3>Ingredients</h3>
              <ul className="">
                {recipe?.ingredients?.map((item, idx) => (
                  <li key={idx} className="">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right md:text-left">
              <h3 className="">Nutrition</h3>
              <div className="">
                <strong className="border-b-2 border-gray-200">Calories</strong>
                <div>{recipe?.nutrition?.calories || 0}</div>
              </div>
              <div className="">
                <strong className="border-b-2 border-gray-200">
                  Carbohydrates
                </strong>
                <div>{recipe?.nutrition?.carbohydates || 0}</div>
              </div>
              <div className="">
                <strong className="border-b-2 border-gray-200">Protein</strong>
                <div>{recipe?.nutrition?.protein || 0}</div>
              </div>
              <div className="">
                <strong className="border-b-2 border-gray-200">Fat</strong>
                <div>{recipe?.nutrition?.fat || 0}</div>
              </div>
            </div>
          </div>

          <div className="">
            <h3>Directions</h3>
            <div className="">{recipe.directions}</div>
          </div>
        </article>
      </dialog>
    </>
  );
}

function RecipeInfo({
  check,
  recipe,
  customColor,
  setCurrentRecipe,
  currentSectionList,
  setCurrentSectionList,
}) {
  const [collectionsCheck, setCollectionsCheck] = useState(check);
  const handleAddToCollections = (event) => {
    // prevent default events from happening
    event.preventDefault();
    // toggle collections check state
    // the check state is responsible for rendering different versions of the svg
    setCollectionsCheck(!collectionsCheck);
    // if a recipe is not in collections then when the button is clicked add it, otherwise remove it
    // its just a one liner if function that performs a toggle function
    !currentSectionList.includes(recipe.name)
      ? setCurrentSectionList([...currentSectionList, recipe.name])
      : setCurrentSectionList(
          currentSectionList.filter((item) => item !== recipe.name)
        );
  };
  return (
    <ol className="relative p-2 border-gray-200 cursor-pointer rounded-r-md border-s dark:border-gray-700">
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {new Date().toLocaleString("default", { month: "long" }) +
            " " +
            new Date().getFullYear()}
        </time>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {recipe.name}
        </h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <span>Cook time</span>{" "}
          <strong>
            {!recipe.cooking_time ? "0 minutes" : recipe.cooking_time}
          </strong>
        </p>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <span>Prep time</span>{" "}
          <strong>{!recipe.prep_time ? "0 minutes" : recipe.prep_time}</strong>
        </p>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <span>Meal type</span> <strong>Breakfast</strong>
        </p>
        <button
          href="#"
          onClick={handleAddToCollections}
          className="flex items-center px-4 py-2 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Add to collections{" "}
          <svg
            className="w-3 h-3 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {collectionsCheck ? (
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            ) : (
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            )}
          </svg>
        </button>
        <button
          href="#"
          onClick={() => setCurrentRecipe(recipe)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Learn more{" "}
          <svg
            className="w-3 h-3 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </li>
    </ol>
  );
}
