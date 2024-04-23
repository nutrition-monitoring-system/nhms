"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "./Button.jsx";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { chronicConditions } from "@/utils/dataRegistration.js";
export default function ChronicConditions({
  onClickNext,
  onClickPrev,
  handleCollectData,
  forModal = false,
}) {
  //Chronic conditions
  // Component to handle chronic condition selection
  // Params:
  //   onClick: Function to handle click events
  //   onClickPrev: Function to handle click events for going back
  //   handleCollectData: Function to handle collecting data
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

  // Ref for individual condition buttons
  const ConditionRefs = useRef({});

  // Function to handle "None" button click
  const handleNone = (event) => {
    // Remove background color if event is null
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");

    event.preventDefault();

    // Remove background color from all other condition buttons
    Object.keys(ConditionRefs.current).forEach((key) => {
      ConditionRefs.current[key].classList.remove("bg-secondary");
    });

    // Toggle background color for "None"
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  // Function to handle condition button click
  const handleOptionClick = (refIdx) => {
    // Toggle background color for the clicked condition button
    ConditionRefs.current[refIdx].classList.toggle("bg-secondary");

    // Deselect all other options and toggle background color for "None"
    handleNone(null);

    // Update selected user options
    SetUserSelected([...userSelected, chronicConditions[refIdx].type]);
  };

  useEffect(() => {
    localStorage.setItem("chronicConditions", JSON.stringify(userSelected));
  }, [userSelected]);

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
      <div className="flex flex-col justify-center flex-1 min-w-full gap-3 p-2 rounded-md items-left min-h-fit">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Chronic Conditions
        </h1>
        <div className="relative flex items-center gap-1 p-2">
          <Image src="/icons/add.png" alt="add symbol" width={20} height={20} />
          <input
            type="text conditions"
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
            onClick={handleNone}
            ref={noneButtonRef}
          >
            <Image
              src="/icons/add.png"
              className="rotate-45"
              alt="add icon"
              width={20}
              height={20}
            />
            None
          </button>
          {chronicConditions.map((condition, idx) => {
            return (
              <div key={idx}>
                <div
                  className="tile conditions"
                  ref={(element) => (ConditionRefs.current[idx] = element)}
                  onClick={() => handleOptionClick(idx)}
                >
                  <Image
                    onClick={(event) =>
                      handleModalclick(
                        event,
                        condition?.type,
                        condition?.description
                      )
                    }
                    src="/icons/info.png"
                    alt="information icon"
                    width={20}
                    height={20}
                  />
                  {condition?.type}
                </div>
              </div>
            );
          })}
        </div>
        {!forModal && (
          <div className="grid grid-cols-2 place-items-center">
            <Button onClick={onClickPrev}>Previous</Button>
            <div id="conditionsNext">
              <Button
                onClick={(event) => {
                  handleCollectData({ chronicConditions: userSelected });
                  onClickNext(event);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
