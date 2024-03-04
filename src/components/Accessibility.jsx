"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "./Button.jsx";
import { useRef, useState } from "react";
import Image from "next/image";
import { settings } from "../utils/dataRegistration.js";

export default function Accessibility({
  onClickNext,
  onClickPrev,
  handleCollectData,
}) {
  // Accessibility Settings
  // Component to handle Accessiblity Settings selection
  // Params:
  //   onClick: Function to handle click events
  //   onClickPrev: Function to handle click events for going back
  //   handleCollectData: Function to handle collecting data

  // State variable to track selected user options
  const [userSelected, SetUserSelected] = useState([]);

  // Ref for the "None" button
  const noneButtonRef = useRef(null);

  // Ref for individual setting buttons
  const SettingsRef = useRef({});

  // Function to handle "None" button click
  const handleNone = (event) => {
    // Remove background color if event is null
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");

    event.preventDefault();

    // Remove background color from all other setting buttons
    Object.keys(SettingsRef.current).forEach((key) => {
      SettingsRef.current[key].classList.remove("bg-secondary");
    });

    // Toggle background color for "None"
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  // Function to handle setting button click
  const handleOptionClick = (refIdx) => {
    // Toggle background color for the clicked setting button
    SettingsRef.current[refIdx].classList.toggle("bg-secondary");

    // Deselect all other options and toggle background color for "None"
    handleNone(null);

    // Update selected user options
    SetUserSelected([...userSelected, settings[refIdx].type]);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-left gap-3 min-w-full min-h-fit rounded-md flex-1 p-1">
        <h1 className="grid place-items-center text-secondary text-center font-extrabold text-[1.3rem]">
          Accessibility Settings
        </h1>
        <div className="relative flex items-center gap-1 p-2">
          <Image src="/icons/add.png" alt="add symbol" width={20} height={20} />
          <input
            type="text"
            placeholder="Type to add or search"
            className="pl-7 flex-grow"
          />
        </div>
        <div className="min-h-fitrounded-md flex flex-wrap justify-center items-center gap-2 w-full">
          <button
            className="tile bg-secondary"
            onClick={handleNone}
            ref={noneButtonRef}
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
          {settings.map((setting, idx) => {
            return (
              <div key={idx}>
                <div
                  className="tile Settings"
                  ref={(element) => (SettingsRef.current[idx] = element)}
                  onClick={() => handleOptionClick(idx)}
                >
                  <Image
                    src={setting?.src}
                    alt={setting?.alt}
                    width={20}
                    height={20}
                  />
                  {setting?.value}
                </div>
              </div>
            );
          })}
        </div>
        <p className="grid place-items-center text-slate text-center opacity-50 my-1">
          (Please note your changes will be applied after you leave this form.)
        </p>
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <div id="SettingsNext">
            <Button
              onClick={(event) => {
                handleCollectData({ accessibilitySettings: userSelected });
                onClickNext(event);
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
