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
        <div className="flex flex-wrap gap-5 justify-center items-start p-2 md:grid-cols-1 md:px-10 w-[80%] h-fit min-h-3/4 sm:w-full">
          <RecipesModal recipe={currentRecipe} />
          <RenderRecipeSection {...props} setCurrentRecipe={setCurrentRecipe} />
        </div>
      )}
    </>
  );
}

function RenderRecipeSection(props) {
  const {
    currentSectionName,
    currentSectionList,
    recipesList,
    searchInformation,
  } = props;
  switch (currentSectionName) {
    case "Recipes":
      return recipesList
        ?.filter((item) =>
          item.name.toLowerCase().includes(searchInformation.toLowerCase())
        )
        .map((item, idx) => (
          <div key={idx}>
            <RecipeInfo {...props} recipe={item} />
          </div>
        ));

    case "Collections":
      return recipesList
        ?.filter(
          (item) =>
            currentSectionList.some(
              (sectionItem) => sectionItem.name === item.name
            ) &&
            item.name.toLowerCase().includes(searchInformation.toLowerCase())
        )
        .map((item, idx) => (
          <div key={idx}>
            <RecipeInfo {...props} recipe={item} />
          </div>
        ));
    default:
      return recipesList
        ?.filter((item) =>
          item.name.toLowerCase().includes(searchInformation.toLowerCase())
        )
        .map((item, idx) => (
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
        <article className="p-4 mx-auto prose lg:prose-xl prose-gray">
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
  recipe,
  customColor,
  setCurrentRecipe,
  currentSectionList,
  setCurrentSectionList,
}) {
  const handleAddToCollections = (event) => {
    // prevent default events from happening
    event.preventDefault();
    // toggle collections check state
    // the check state is responsible for rendering different versions of the svg
    // if a recipe is not in collections then when the button is clicked add it, otherwise remove it
    // its just a one liner if function that performs a toggle function
    if (
      !currentSectionList.some((itemRecipe) =>
        Object.values(itemRecipe).includes(recipe.name)
      )
    ) {
      setCurrentSectionList([
        ...currentSectionList,
        { check: true, ...recipe },
      ]);
      recipe.check = true;
    } else {
      setCurrentSectionList(
        currentSectionList.filter((item) => item.name !== recipe.name)
      );
      recipe.check = false;
    }
  };
  return (
    <>
      <div className="max-w-sm overflow-hidden border-2 border-gray-300 rounded-lg shadow-xl p-4">
        <div className="grid p-3 place-items-center">
          {/* <Image
            className="w-full m-2 rounded-lg shadow-xl"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8oPRV7E_qlUYUZwVZDHiXR-0Sosbb1TujQ&usqp=CAU"
            width={500}
            height={300}
            alt="Sunset in the mountains"
          /> */}
          <div className="grid mb-2 text-xl font-bold place-items-center">
            {recipe.name}
          </div>
          <div className="flex flex-col items-center justify-between gap-2 mt-4 md:flex-wrap">
            <span>
              Prep time{" "}
              <span className="font-bold">
                {!recipe.prep_time ? "0 minutes" : recipe.prep_time}
              </span>
            </span>
            <span>
              Cook time{" "}
              <span className="font-bold">
                {!recipe.cooking_time ? "0 minutes" : recipe.cooking_time}
              </span>
            </span>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 mt-4 md:flex-wrap">
            <button href="#" onClick={handleAddToCollections} className="tile">
              {recipe?.check ? "Remove from collections" : "Add to collections"}
              <svg
                className="w-3 h-3 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {recipe?.check ? (
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                ) : (
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                )}
              </svg>
            </button>
            <button
              href="#"
              onClick={() => setCurrentRecipe(recipe)}
              className="tile"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
            #Breakfast
          </span>
        </div>
      </div>
    </>
  );
}
