"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "./Button.jsx";
import { useEffect, useRef, useState } from "react";

export default function Allergies({ onClick, onClickPrev, handleCollectData }) {
  //allergies
  // Component to handle allergies selection
  // Params:
  //   onClick: Function to handle click events
  //   onClickPrev: Function to handle click events for going back
  //   handleCollectData: Function to handle collecting data
  // List of available allergies with types and descriptions
  const Allergies = [
    { type: "Peanuts", description: "Allergic to peanuts." },
    { type: "Tree Nuts", description: "Allergic to tree nuts." },
    { type: "Milk", description: "Lactose or milk allergy." },
    { type: "Mustard", description: "Allergic to mustard." },
    { type: "Fish", description: "Allergic to fish." },
    { type: "Egg", description: "Allergic to eggs." },
    { type: "Soy", description: "Allergic to soy products." },
    { type: "Wheat", description: "Wheat or gluten allergy." },
    { type: "Sesame", description: "Allergic to sesame seeds." },
    { type: "Corn", description: "Allergic to corn products." },
    { type: "Shellfish", description: "Allergic to shellfish." },
    { type: "Meat", description: "Allergic to meat products." },
  ];

  // Ref for the modal element
  const modal = useRef(null);

  // State variables for modal content
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [userSelected, SetUserSelected] = useState("");
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

  // Ref for individual allergy buttons
  const AllergyRefs = useRef({});

  // Function to handle "None" button click
  const handleNone = (event) => {
    // Remove background color if event is null
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");

    event.preventDefault();

    // Remove background color from all other allergy buttons
    Object.keys(AllergyRefs.current).forEach((key) => {
      AllergyRefs.current[key].classList.remove("bg-secondary");
    });

    // Toggle background color for "None"
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  // Function to handle allergy button click
  const handleOptionClick = (refIdx) => {
    // Toggle background color for the clicked allergy button
    AllergyRefs.current[refIdx].classList.toggle("bg-secondary");

    // Deselect all other options and toggle background color for "None"
    handleNone(null);

    // Update selected user options
    SetUserSelected([...userSelected, Allergies[refIdx].type]);
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
      <div className="flex flex-col justify-center items-left gap-3 min-w-full min-h-fit p-2 rounded-md flex-1">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Any Allergies?
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
            onClick={handleNone}
            ref={noneButtonRef}
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
          {Allergies.map((allergy, idx) => {
            return (
              <div key={idx}>
                <div
                  className="tile Allergies"
                  ref={(element) => (AllergyRefs.current[idx] = element)}
                  onClick={() => handleOptionClick(idx)}
                >
                  <img
                    onClick={(event) =>
                      handleModalclick(
                        event,
                        allergy?.type,
                        allergy?.description
                      )
                    }
                    src="/icons/info.png"
                    alt="information icon"
                    width={20}
                    height={20}
                  />
                  {allergy?.type}
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <div id="conditionsNext">
            <Button
              onClick={(event) => {
                handleCollectData({ Allergies: userSelected });
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
