"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

const FoodAndWaterLog = () => {
  // Refs for modals and form elements
  const checkboxRef = useRef(null);
  const foodModal = useRef(null);
  const exerciseModal = useRef(null);
  const moodModal = useRef(null);
  const foodName = useRef(null);
  const waterModal = useRef(null);
  const sliderRef = useRef(null);
  // State variables
  const [uploadImageUrl, setUploadImageUrl] = useState("/icons/image.png");
  const [breakfast, setBreakFast] = useState([]);
  const [Lunch, setLunch] = useState([]);
  const [sliderValue, setSliderValue] = useState(250);
  const [Dinner, setDinner] = useState([]);
  const [loadingNutrionalInformation, setLoadingNutrionalInformation] =
    useState(false);
  const nutritionRef = useRef({});
  const nutrition = [
    "calories",
    "carbohydrates_total_g",
    "cholesterol_mg",
    "fat_saturated_g",
    "fat_total_g",
    "fiber_g",
    "potassium_mg",
    "protein_g",
    "serving_size_g",
    "sodium_mg",
    "sugar_g",
  ];
  const [type, setType] = useState("");
  // Function to close the food modal
  const handleModalclose = (event) => {
    event.preventDefault();
    foodModal.current.close();
  };
  /* This changes the colour + value of what tab is currently selected based on the press. */
  const [ColorLogToggle, setColorLogToggle] = useState("food");
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
    handleModalclose(event);
  };

  const fetchNutritionalInformation = () => {
    const apiKey = "pZiGxpolJyChNfzL8u82rw==IsxlGQ6C1c8DCBNa";
    fetch(
      "https://api.api-ninjas.com/v1/nutrition?query=" + foodName.current.value,
      {
        method: "GET",
        headers: { "X-Api-Key": apiKey },
        contentType: "application/json",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        Object.keys(nutritionRef.current).forEach((key) => {
          // nutritionRef.current[key].value = data[0][key];
          const objectkey = nutritionRef.current[key].placeholder;
          nutritionRef.current[key].value = data[0][objectkey];
        });
        setLoadingNutrionalInformation(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleOnChange = (event) => {
    event.preventDefault();
    checkboxRef.current.checked = !checkboxRef.current.checked;
    const useAI = checkboxRef.current.checked;

    if (useAI) {
      if (foodName.current.value.length > 0) {
        setLoadingNutrionalInformation(true);
        fetchNutritionalInformation();
      } else {
        checkboxRef.current.checked = false;
        alert("Please enter a food name");
      }
    } else {
      Object.keys(nutritionRef.current).forEach((key) => {
        nutritionRef.current[key].value = "";
      });
    }
  };
  return (
    <>
      <dialog
        ref={foodModal}
        className="w-[40%] md:w-[90%] h-fit bg-white rounded-md relative p-1"
      >
        <div className="p-2 grid place-items-center gap-1">
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            Did you have anything today?
          </h1>
          <h3 className="font-bold text-secondary uppercase">{type}</h3>
          <div className="gap-1 flex-col flex justify-center items-center w-3/4">
            <input
              name="Foodname"
              type="text"
              placeholder="Food name"
              ref={foodName}
              onChange={(e) => (foodName.current.value = e.target.value)}
            />
            <div
              className="flex w-full gap-3 p-2 my-2 select-none cursor-pointer ring-black ring rounded-md"
              onClick={handleOnChange}
            >
              <div className="flex">
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  className="text-secondary cursor-pointer"
                />
              </div>
              <label className="cursor-pointer">
                <p>Use A.I to get nutritional information</p>
                <p className="grid place-items-center text-slate text-center opacity-50 my-1">
                  Please note that A.I generated content is not 100% accurate
                </p>
              </label>
            </div>
          </div>
          <details className="gap-1 flex flex-col justify-center items-center w-3/4">
            <summary>More nutritional information</summary>
            {loadingNutrionalInformation && (
              <span className="w-full text-secondary font-lg text-center">
                Loading...
              </span>
            )}
            {nutrition.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 m-1 place-items-center"
              >
                <label>{item}</label>
                <input
                  ref={(elem) => (nutritionRef.current[idx] = elem)}
                  type="number"
                  className="text-secondary m-1"
                  placeholder={item}
                />
              </div>
            ))}
          </details>
          <div className="flex justify-around items-center mt-2 w-full">
            <button onClick={handleAddFood} className="tile" id="addNext">
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="rounded-full"
                width={25}
                height={25}
              />
              Add
            </button>
            <button onClick={handleModalclose} className="tile" id="closeNext">
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="rounded-full rotate-45"
                width={25}
                height={25}
              />
              Close
            </button>
          </div>
        </div>
      </dialog>
      <dialog
        ref={waterModal}
        className="w-[40%] md:w-[90%] h-fit bg-white rounded-md relative p-1"
      >
        <div className="p-2 grid place-items-center gap-1 overflow-y-hidden">
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            How much did you drink?
          </h1>
          <div className="w-3/4 grid place-items-center">
            <div className="h-[150px] shadow-lg w-3/4 bg-gray-100 p-1 rounded-md m-2 flex flex-col justify-end items-center">
              <div
                style={{
                  height: `${(sliderValue / 1000) * 100}%`,
                }}
                className="h-full bg-blue-500 w-full rounded-md grid place-items-center transition-all duration-300 ease-in-out"
              ></div>
            </div>
            <div>{sliderValue} ml</div>
            <Slider
              defaultValue={[sliderValue]}
              ref={sliderRef}
              max={1000}
              step={50}
              onValueChange={(value) => {
                setSliderValue(value[0]);
              }}
              className="bg-gray-100 rounded-md w-3/4 m-2"
            />
          </div>
          <div className="flex justify-around items-center mt-2 w-full">
            <button
              className="tile"
              id="addNext"
              onClick={(event) => {
                event.preventDefault();
                waterModal.current.close();
              }}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="rounded-full"
                width={25}
                height={25}
              />
              Add
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                waterModal.current.close();
              }}
              className="tile"
              id="closeNext"
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="rounded-full rotate-45"
                width={25}
                height={25}
              />
              Close
            </button>
          </div>
        </div>
      </dialog>

      <Tabs
        defaultValue="food"
        className="min-h-[200px]"
        value={ColorLogToggle}
      >
        <TabsList className="flex flex-row w-full place-content-evenly mb-4 h-auto bg-primarylight rounded-md p-2 shadow-inner shadow-primary/75 bg-blend-multiply">
          <TabsTrigger
            value="food"
            className={
              ColorLogToggle === "food"
                ? "tile font-bold bg-primary px-4 rounded-md shadow-inner shadow-black/10"
                : "tile px-4 bg-transparent shadow-none rounded-md"
            }
            onClick={() => {
              setColorLogToggle("food");
            }}
          >
            Food Log
          </TabsTrigger>
          <span className="w-0.5 min-h-full bg-[#C2897C]"></span>
          <TabsTrigger
            value="water"
            className={
              ColorLogToggle === "water"
                ? "tile font-bold bg-primary px-4 rounded-md shadow-inner shadow-black/10"
                : "tile bg-transparent shadow-none px-4 rounded-md"
            }
            onClick={() => {
              setColorLogToggle("water");
            }}
          >
            Water Log
          </TabsTrigger>
        </TabsList>
        <TabsContent value="food" className="">
          <div className="min-h-full grid grid-cols-2 grid-rows-2">
            <div
              className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md cursor-pointer "
              onClick={(event) => handleAddClick(event, "breakfast")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="bg-primary rounded-full p-3"
                width={40}
                height={40}
              />
              <div htmlFor="name">Breakfast</div>
            </div>
            <div
              className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md cursor-pointer"
              onClick={(event) => handleAddClick(event, "Lunch")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="bg-primary rounded-full p-3 hover:bg-primarylight"
                width={40}
                height={40}
              />
              <div htmlFor="name">Lunch</div>
            </div>
            <div
              className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md cursor-pointer"
              onClick={(event) => handleAddClick(event, "Dinner")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="bg-primary rounded-full p-3"
                width={40}
                height={40}
              />
              <div htmlFor="name">Dinner</div>
            </div>
            <div
              className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md cursor-pointer"
              onClick={(event) => handleAddClick(event, "snack")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="bg-primary rounded-full p-3"
                width={40}
                height={40}
              />
              <div htmlFor="name">Snack</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="water">
          <div className="min-h-full">
            <button
              className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md w-full"
              onClick={(event) => {
                event.preventDefault();
                waterModal.current.showModal();
              }}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="bg-primary rounded-full p-3"
                width={40}
                height={40}
              />
              <div htmlFor="name">Water Amount</div>
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default FoodAndWaterLog;
