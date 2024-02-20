"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "./Button.jsx";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function DailyIntake({ onClickPrev, handleSubmit }) {
  /* Daily Food form.  */
  // adding daily intake
  // Component to handle daily food intake
  // Params:
  //   onClickPrev: Function to handle click events for going back
  //   handleSubmit: Function to handle form submission

  // Refs for modals and form elements
  const foodModal = useRef(null);
  const exerciseModal = useRef(null);
  const moodModal = useRef(null);
  const foodName = useRef(null);
  const foodDescription = useRef(null);
  const aDrink = useRef(null);
  // State variables
  const [uploadImageUrl, setUploadImageUrl] = useState("/icons/image.png");
  const [breakfast, setBreakFast] = useState([]);
  const [Lunch, setLunch] = useState([]);
  const [Dinner, setDinner] = useState([]);
  const [type, setType] = useState("");
  // Function to close the food modal
  const handleModalclose = (event) => {
    event.preventDefault();
    foodModal.current.close();
  };
  // Function to handle adding food
  const handleAddClick = (event, type) => {
    event.preventDefault();
    foodModal.current.showModal();
    setType(type);
  };
  // Function to handle submitting food form
  const handleAddFood = (event) => {
    event.preventDefault();
    const foodInformation = {
      name: foodName.current.value,
      description: foodDescription.current.value,
      drink: aDrink.current.value,
    };
    // Adding food based on the meal type
    switch (type) {
      case "breakfast":
        setBreakFast([...breakfast, foodInformation]);
        break;
      case "lunch":
        setLunch([...Lunch, foodInformation]);
        break;
      default: // dinner
        setDinner([...Dinner, foodInformation]);
        break;
    }
    // Clearing form fields
    foodName.current.value = "";
    foodDescription.current.value = "";
    handleModalclose(event);
  };
  // // Function to handle uploading an image
  function handleUploadImage(event) {}
  // function handleUploadImage(event) {
  //   const file = event.target.files[0];
  //   const fileName = file.name;
  //   const reader = new FileReader();
  //   // Reading the file data
  //   reader.onload = function (e) {
  //     console.log("Filename", fileName);
  //   };
  //   reader.readAsDataURL(file);
  //   useEffect(() => {
  //     // Updating the image URL on successful image upload
  //     const eventId = addEventListener("load", () =>
  //       setUploadImageUrl("/icons/add.png")
  //     );
  //     return () => {
  //       removeEventListener(eventId);
  //     };
  //   }, []);
  // }

  return (
    <>
      <dialog
        ref={foodModal}
        className="w-[35%] h-fit bg-white rounded-md relative p-1 sm:w-[90%]"
      >
        <div className="p-2 grid place-items-center gap-1">
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            Did you have anything today?
          </h1>
          <h3 className="font-bold text-secondary">{type.toUpperCase()}</h3>
          <div className="gap-1 flex justify-center items-center flex-col w-3/4 p-2">
            <input
              name="Foodname"
              type="text"
              placeholder="Food name"
              ref={foodName}
              className=""
            />
            <input
              name="Fooddescription"
              type="text"
              placeholder="Food type"
              className="my-2"
              ref={foodDescription}
            />
            <input
              name="Fooddewater"
              className=""
              type="text"
              placeholder="Drinks"
              ref={aDrink}
            />
          </div>
          <div className="flex justify-around items-center mt-2 w-full">
            <button onClick={handleAddFood} className="tile" id="addNext">
              Add
            </button>
            <button onClick={handleModalclose} className="tile" id="closeNext">
              Close
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        ref={moodModal}
        className="w-[35%] h-fit bg-white rounded-md relative p-1 sm:w-[90%]"
      >
        <div className="p-2 grid place-items-center gap-1">
          <h1 className="grid place-items-center font-extrabold text-xl">
            Mood
          </h1>
          <h3 className="font-bold text-secondary">{type.toUpperCase()}</h3>
          <div className="gap-1 flex justify-center items-center flex-col w-3/4 p-2"></div>
          <div className="flex justify-around items-center mt-2 w-full">
            <button onClick={handleAddFood} className="tile" id="addNext">
              Add
            </button>
            <button onClick={handleModalclose} className="tile" id="closeNext">
              Close
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        ref={exerciseModal}
        className="w-[35%] h-fit bg-white rounded-md relative p-1 sm:w-[90%]"
      >
        <div className="p-2 grid place-items-center gap-1">
          <h1 className="grid place-items-center font-extrabold text-xl">
            Exercise
          </h1>
          <h3 className="font-bold text-secondary">{type.toUpperCase()}</h3>
          <div className="gap-1 flex justify-center items-center flex-col w-3/4 p-2"></div>
          <div className="flex justify-around items-center mt-2 w-full">
            <button onClick={handleAddFood} className="tile" id="addNext">
              Add
            </button>
            <button onClick={handleModalclose} className="tile" id="closeNext">
              Close
            </button>
          </div>
        </div>
      </dialog>

      <div className="min-w-full pb-2 mx-auto">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Did you have anything today?
        </h1>
        <div className="grid grid-rows-3 grid-cols-1 p-1 rounded-md">
          <div className=" bg-white rounded-md flex flex-col p-3 shadow-lg">
            <div className="flex items-center justify-around gap-3">
              <h1>Breakfast</h1>
              <h1>Lunch</h1>
              <h1>Dinner</h1>
            </div>
            <div className="min-w-full p-1 flex justify-around items-center gap-3">
              <div
                id="addBreakFast"
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "breakfast")}
              >
                <Image
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                />
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "lunch")}
              >
                <Image
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                />
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "dinner")}
              >
                <Image
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md flex flex-col p-3 shadow-lg my-1">
            <div className="flex items-center justify-around gap-3">
              <h1>Mood</h1>
              <h1>Exercise</h1>
              <h1>Upload</h1>
            </div>
            <div className="min-w-full p-1 flex justify-around items-center gap-3">
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) =>
                  event.preventDefault() && moodModal.current.showModal()
                }
              >
                <Image
                  src={"/icons/mood.png"}
                  alt={"Mood icon"}
                  width={40}
                  height={40}
                />
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) =>
                  event.preventDefault() && exerciseModal.current.showModal()
                }
              >
                <Image
                  src={"/icons/workout.png"}
                  alt={"workout icon"}
                  width={40}
                  height={40}
                />
              </div>
              <div className="relative aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]">
                <Image
                  src={uploadImageUrl}
                  alt={"Add img icon"}
                  width={30}
                  height={30}
                />
                <input
                  type="file"
                  className="absolute inset-0 opacity-0"
                  onChange={handleUploadImage}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md flex flex-col p-3 shadow-lg">
            <div className="min-w-full p-1 flex justify-left items-center gap-2 overflow-hidden">
              {[...breakfast, ...Lunch, ...Dinner].map((food, idx) => {
                return (
                  <div key={idx}>
                    <div className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg flex justify-center items-center text-center p-2 cursor-pointer">
                      <Image
                        src="/icons/headerIcons/hamburger.png"
                        alt="Hamburger Icon."
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <div id="DoneNext">
            <Button onClick={handleSubmit} type="submit">
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
