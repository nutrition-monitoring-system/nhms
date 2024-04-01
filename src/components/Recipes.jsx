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
        <div className="grid grid-cols-4 p-2 md:grid-cols-1 md:px-10 sm:grid-cols-1 gap-3 sm:gap-3 w-[80%] xl:w-[70%] h-fit min-h-3/4 sm:w-full">
          <RecipesModal recipe={currentRecipe} />
          {recipesList
            ?.filter((item) =>
              item.name.toLowerCase().includes(searchInformation.toLowerCase())
            )
            .map((item, idx) => (
              <div key={idx}>
                <RecipeInfo
                  {...props}
                  customColor={"bg-amber-100"}
                  recipe={item}
                  setCurrentRecipe={setCurrentRecipe}
                />
              </div>
            ))}
          {/* <RenderRecipeSection {...props} setCurrentRecipe={setCurrentRecipe} /> */}
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
            className="text-white bg-black tile"
            onClick={() => modal.current.close()}
          >
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
  const [toogleAddCollections, setToogleAddCollections] = useState(
    check ? "/icons/check.png" : "/icons/add.png"
  );
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
          ` ${customColor ? `${customColor}` : "bg-rose-100"}`
        }
      >
        <div className="grid p-5 overflow-hidden transition-colors duration-1000 ease-in-out bg-white bg-cover rounded-md shadow-lg cursor-pointer place-items-center">
          <div className="text-center font-sans font-extrabold text-[1.5rem] text-black">
            {recipe.name}
          </div>
        </div>
        <div className="">
          <div
            className={
              `text-sm shadow-xl grid place-items-center p-2 rounded-md` +
              `${customColor}`
                ? `${customColor}`
                : "bg-rose-100"
            }
          >
            <div className="flex items-center justify-around w-full">
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
            <div className="flex items-center justify-around w-full text-center">
              <span>Prep time</span> <span>{recipe.prep_time}</span>
            </div>
            <div className="flex items-center justify-around w-full text-left">
              <span>Cook time</span>{" "}
              <span>
                {!recipe.cooking_time ? "0 minutes" : recipe.cooking_time}
              </span>
            </div>
            <div className="flex items-center justify-around w-full text-left">
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
      <div className="grid p-5 overflow-hidden transition-colors duration-1000 ease-in-out bg-white bg-cover rounded-md shadow-lg cursor-pointer place-items-center">
        <div className="text-center font-sans font-extrabold text-[1.5rem] text-black"></div>
      </div>
      <div className="">
        <div className="grid h-full p-2 text-sm rounded-md shadow-xl bg-rose-100 place-items-center">
          <div className="flex items-center justify-around w-full">
            <div className="bg-white w-[40px] h-[40px] rounded-full"></div>
            <div className="bg-white w-[40px] h-[40px] rounded-full"></div>
          </div>
          <div className="flex items-center justify-around w-full text-center"></div>
          <div className="flex items-center justify-around w-full text-left"></div>
          <div className="flex items-center justify-around w-full text-left"></div>
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
