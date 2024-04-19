"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import { useRef, useState } from "react";
import Image from "next/image";
import { foodTypeInformation } from "../utils/dataRegistration.js";

export default function FoodCategories({
  onClickNext,
  onClickPrev,
  handleCollectData,
}) {
  // This function returns a search bar and a list of dietery restrictions
  // params:
  //    onClick - a callback function responsible for handling the next button click
  //    onClickPrev - a callback function responsible for handling the previous button click
  //    handleCollectionData - a callback function responsible for adding data collected
  //                           from user preferences in to the output into a parent array called otherData
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
        className="relative bg-white rounded-md min-h-fit min-w-fit"
      >
        <div className="grid gap-1 p-2 place-items-center">
          <h1 className="text-lg font-bold text-center">{type}</h1>
          <p className="w-3/4 text-center">{description}</p>
          <button onClick={handleModalclose} className="tile">
            Close
          </button>
        </div>
      </dialog>
      {/*  */}
      <div className="flex flex-col justify-center flex-1 min-w-full gap-3 p-2 rounded-md items-left min-h-fit">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Dietary Restrictions?
        </h1>
        <div className="relative flex items-center gap-1 p-2">
          <Image src="/icons/add.png" alt="add symbol" width={20} height={20} />
          <input
            type="text"
            placeholder="Type to add or search"
            className="flex-grow pl-7"
            onChange={handleOnChange}
            ref={inputRef}
            onSubmit={(e) => e.preventDefault()}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-2 min-h-fitrounded-md">
          <button
            className="tile bg-secondary"
            ref={noneButtonRef}
            onClick={(event) => handleNone(event)}
          >
            <Image
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
                    <Image
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
            <button className="tile" onClick={onClickPrev}>
              Previous
            </button>
          </div>
          <div id="AllergiesNext">
            <button
              className="tile"
              id="#DoneNext"
              onClick={(event) => {
                handleCollectData({ foodCategories: userSelected });
                onClickNext(event);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
