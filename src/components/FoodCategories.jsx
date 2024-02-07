// food category
"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "./Button.jsx";
import { useEffect, useRef, useState } from "react";
export default function FoodCategories({
  onClick,
  onClickPrev,
  handleCollectData,
}) {
  // This function returns a search bar and a list of dietery restrictions
  // params:
  //    onClick - a callback function responsible for handling the next button click
  //    onClickPrev - a callback function responsible for handling the previous button click
  //    handleCollectionData - a callback function responsible for adding data collected
  //                           from user preferences in to the output into a parent array called otherData
  // dietery restrictions array and it's descriptions
  const foodTypeInformation = [
    { type: "Vegan", description: "No animal products." },
    { type: "Vegetarian", description: "Plant-based diet without meat." },
    { type: "Omnivore", description: "Eats both plants and animals." },
    {
      type: "Paleo",
      description: "Emphasizes whole foods, like our ancestors.",
    },
    { type: "Pescatarian", description: "Vegetarian with fish and seafood." },
    { type: "Carnivore", description: "Primarily meat-based diet." },
    {
      type: "Flexitarian",
      description: "Mainly plant-based with occasional meat.",
    },
    { type: "Keto", description: "High-fat, low-carb diet for ketosis." },
    { type: "Gluten-free", description: "Avoids gluten-containing foods." },
    { type: "Lactose-free", description: "Avoids lactose in dairy products." },
    { type: "Dairy-free", description: "Excludes all dairy products." },
    {
      type: "Shellfish-free",
      description: "Avoids shellfish due to allergies.",
    },
    { type: "Soy-free", description: "Excludes soy-based foods." },
    { type: "Allergen-free", description: "Avoids common allergens." },
    { type: "Low-carb", description: "Restricts carbohydrates." },
    { type: "Mediterranean", description: "Based on Mediterranean cuisine." },
    { type: "Low-fat", description: "Emphasizes low-fat foods." },
    { type: "Low-sugar", description: "Limits sugar intake." },
    { type: "Low-food", description: "Reduces overall food consumption." },
  ];

  // Ref for the modal element
  const modal = useRef(null);

  // State variables for modal content
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [userSelected, SetUserSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Ref for the input element
  const inputRef = useRef(null);

  // Function to update searchValue when input changes
  const handleOnChange = () => {
    setSearchValue(inputRef.current.value);
  };

  // Function to close the modal
  const handleModalclose = (event) => {
    event.preventDefault();
    modal.current.close();
  };

  // Function to open the modal and set type and description
  const handleModalclick = (event, type, description) => {
    event.preventDefault();
    modal.current.showModal();
    setType(type);
    setDescription(description);
  };

  // Ref for the "None" button
  const noneButtonRef = useRef(null);

  // Ref for individual food type buttons
  const FoodTypeRefs = useRef({});

  // Function to handle "None" button click
  const handleNone = (event) => {
    // Remove background color if event is null
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");

    event.preventDefault();

    // Remove background color from all other food type buttons
    Object.keys(FoodTypeRefs.current).forEach((key) => {
      FoodTypeRefs.current[key].classList.remove("bg-secondary");
    });

    // Clear selected user options and toggle background color for "None"
    SetUserSelected([]);
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  // Function to handle food type button click
  const handleOptionClick = (refIdx) => {
    // Toggle background color for the clicked food type button
    FoodTypeRefs.current[refIdx].classList.toggle("bg-secondary");

    // Deselect all other options and toggle background color for "None"
    handleNone(null);

    // Update selected user options
    SetUserSelected([...userSelected, foodTypeInformation[refIdx].type]);
  };

  return (
    <>
      {/* dynamic dialog box */}
      <dialog
        ref={modal}
        className="min-h-fit min-w-fit bg-white rounded-md relative"
      >
        <div className="p-2 grid place-items-center gap-1">
          <h1 className="text-center text-lg font-bold">{type}</h1>
          <p className="text-center w-3/4">{description}</p>
          <button onClick={handleModalclose} className="tile">
            Close
          </button>
        </div>
      </dialog>
      {/*  */}
      <div className="flex flex-col justify-center items-left gap-3 min-w-full min-h-fit p-2 rounded-md flex-1">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Dietary Restrictions?
        </h1>
        <div className="relative flex items-center gap-1 p-2">
          <img src="/icons/add.png" alt="add symbol" width={20} height={20} />
          <input
            type="text"
            placeholder="Type to add or search"
            className="pl-7 flex-grow"
            onChange={handleOnChange}
            ref={inputRef}
            onSubmit={(e) => e.preventDefault()}
          />
        </div>
        <div className="min-h-fitrounded-md flex flex-wrap justify-center items-center gap-2 w-full">
          <button
            className="tile bg-secondary"
            ref={noneButtonRef}
            onClick={(event) => handleNone(event)}
          >
            <img
              src="/icons/add.png"
              className="rotate-45"
              alt="go full screen icon"
              width={20}
              height={20}
            />
            None
          </button>
          {foodTypeInformation
            .slice(0, 10)
            ?.filter((food) => food.type.includes(searchValue))
            .map((food, idx) => {
              return (
                <div key={idx}>
                  <div
                    className="tile Restrictions"
                    ref={(element) => (FoodTypeRefs.current[idx] = element)}
                    onClick={() => handleOptionClick(idx)}
                  >
                    <img
                      onClick={(e) =>
                        handleModalclick(e, food?.type, food?.description)
                      }
                      src="/icons/info.png"
                      alt="information icon"
                      width={20}
                      height={20}
                    />
                    {food?.type}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <div>
            <Button onClick={onClickPrev}>Previous</Button>
          </div>
          <div id="AllergiesNext">
            <Button
              onClick={(event) => {
                handleCollectData({ foodCategories: userSelected });
                onClick(event);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
