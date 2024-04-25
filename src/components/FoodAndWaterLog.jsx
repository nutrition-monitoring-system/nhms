"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const FoodAndWaterLog = () => {
  // Refs for modals and form elements
  const checkboxRef = useRef(null);
  const foodModal = useRef(null);
  const exerciseModal = useRef(null);
  const moodModal = useRef(null);
  const foodName = useRef(null);
  const waterModal = useRef(null);
  const sliderRef = useRef(null);
  const cycleModal = useRef(null);
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
  /* Get user's username. */
  const { data: session, status } = useSession();

  /* MADE USERNAME OPTIONAL BUT IT WONT WORK IN THE REGISTER SECTION */
  let sendID = { id: session?.user.name };
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
  const handleModalClose = (event, modalRef) => {
    event.preventDefault();
    modalRef.current.close();
  };

  const showCircleModal = () => {
    cycleModal.current.showModal();
  };
  const showMoodModal = () => {
    moodModal.current.showModal();
  };

  return (
    <>
      {/* Food Modal */}
      <dialog
        ref={foodModal}
        className="w-[35%] md:w-[90%] h-fit bg-white rounded-md p-1"
      >
        <div className="w-full p-2">
          <button
            onClick={(event) => handleModalClose(event, foodModal)}
            className="tile"
          >
            <Image
              alt="add image icon"
              src="/icons/add.png"
              className="rotate-45"
              width={20}
              height={20}
            ></Image>
            Close
          </button>
        </div>
        <div className="grid gap-1 p-2 place-items-center">
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            Did you have anything today?
          </h1>
          <h3 className="font-bold uppercase text-secondary">{type}</h3>
          <div className="flex flex-col items-center justify-center w-3/4 gap-1">
            <input
              name="Foodname"
              type="text"
              placeholder="Food name"
              ref={foodName}
              onChange={(e) => (foodName.current.value = e.target.value)}
            />
            <div
              className="flex w-full gap-3 p-2 my-2 rounded-md cursor-pointer select-none ring-black ring"
              onClick={handleOnChange}
            >
              <div className="flex">
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  className="cursor-pointer text-secondary"
                />
              </div>
              <label className="cursor-pointer">
                <p>Use A.I to get nutritional information</p>
                <p className="grid my-1 text-center opacity-50 place-items-center text-slate">
                  Please note that A.I generated content is not 100% accurate
                </p>
              </label>
            </div>
          </div>
          <details className="flex flex-col items-center justify-center w-3/4 gap-1">
            <summary>More nutritional information</summary>
            {loadingNutrionalInformation && (
              <span className="w-full text-center text-secondary font-lg">
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
                  className="m-1 text-secondary"
                  placeholder={item}
                />
              </div>
            ))}
          </details>
          <div className="flex items-center justify-around w-full mt-2">
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
          </div>
        </div>
      </dialog>
      {/* Water Modal */}
      <dialog
        ref={waterModal}
        className="w-[35%] md:w-full h-fit bg-white rounded-md p-1"
      >
        <div className="w-full p-2">
          <button
            onClick={(event) => handleModalClose(event, waterModal)}
            className="tile"
          >
            <Image
              alt="add image icon"
              src="/icons/add.png"
              className="rotate-45"
              width={20}
              height={20}
            ></Image>
            Close
          </button>
        </div>
        <div className="grid gap-1 p-2 overflow-y-hidden place-items-center">
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            How much did you drink?
          </h1>
          <div className="grid w-3/4 place-items-center">
            <div className="h-[150px] shadow-lg w-3/4 bg-gray-100 p-1 rounded-md m-2 flex flex-col justify-end items-center">
              <div
                style={{
                  height: `${(sliderValue / 1000) * 100}%`,
                }}
                className="grid w-full h-full transition-all duration-300 ease-in-out bg-blue-500 rounded-md place-items-center"
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
              className="w-3/4 m-2 bg-gray-100 rounded-md"
            />
          </div>
          <div className="flex items-center justify-around w-full mt-2">
            <button
              className="tile"
              id="addNext"
              onClick={(event) => {
                /* This is where the fetch request for adding a new water entry should go. */
                event.preventDefault();
                console.log(sliderValue);
                fetch("/api/log/addLogEntry", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userID: sendID.id,
                    keyword: "water",
                    water: { waterAmount: sliderValue },
                  }),
                }).then((response) => {
                  if (response.ok) {
                    toast.success("Water log added!");
                  } else {
                    toast.error("There was a problem.");
                  }
                });

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
          </div>
        </div>
      </dialog>
      {/* Menstrual Cycle Modal */}
      <dialog
        ref={cycleModal}
        className="w-[30%] md:w-full h-fit bg-white rounded-md p-1"
      >
        <div className="w-full p-2">
          <button
            onClick={(event) => {
              handleModalClose(event, cycleModal);
              setColorLogToggle("food");
            }}
            className="tile"
          >
            <Image
              alt="add image icon"
              src="/icons/add.png"
              className="rotate-45"
              width={20}
              height={20}
            ></Image>
            Close
          </button>
        </div>
        <div className="grid gap-1 p-2 overflow-y-hidden place-items-center">
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            Menstrual Cycle Log
          </h1>
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            Time
          </h1>
          <input type="date" />
        </div>
        <div className="flex items-center justify-around w-full mt-2">
          <button
            className="tile"
            id="addNext"
            onClick={(event) => {
              event.preventDefault();
              cycleModal.current.close();
              setColorLogToggle("food");
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
        </div>
      </dialog>
      {/* Mood Modal */}
      <dialog
        ref={moodModal}
        className="w-[30%] md:w-full h-fit bg-white rounded-md p-1"
      >
        <div className="w-full p-2">
          <button
            onClick={(event) => {
              handleModalClose(event, moodModal);
              setColorLogToggle("food");
            }}
            className="tile"
          >
            <Image
              alt="add image icon"
              src="/icons/add.png"
              className="rotate-45"
              width={20}
              height={20}
            ></Image>
            Close
          </button>
        </div>
        <div className="grid gap-1 p-2 overflow-y-hidden place-items-center">
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            Mood Log
          </h1>
          <h1 className="grid place-items-center font-extrabold text-[1.3rem]">
            How are you feeling today?
          </h1>
          <div className="grid w-full grid-cols-3 h-[50px] gap-2 p-2 place-content-center">
            <div className="grid h-full rounded-md bg-emerald-400 place-items-center tile">
              Happy
            </div>
            <div className="grid h-full rounded-md bg-amber-400 place-items-center tile">
              Neutral
            </div>
            <div className="grid h-full rounded-md bg-rose-400 place-items-center tile">
              Sad
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around w-full mt-2">
          <button
            className="tile"
            id="addNext"
            onClick={(event) => {
              event.preventDefault();
              moodModal.current.close();
              setColorLogToggle("food");
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
        </div>
      </dialog>

      <Tabs
        defaultValue="food"
        className="min-h-[200px]"
        value={ColorLogToggle}
      >
        <TabsList className="flex justify-around w-full h-auto p-2 mb-4 bg-white rounded-md shadow-inner shadow-primary/75 bg-blend-multiply">
          <TabsTrigger
            value="food"
            className={
              ColorLogToggle === "food"
                ? "tile font-bold bg-primary px-4 rounded-md shadow-inner md:text-sm shadow-black/10"
                : "tile px-4 bg-transparent shadow-none rounded-md"
            }
            onClick={() => {
              setColorLogToggle("food");
            }}
          >
            Food Log
          </TabsTrigger>
          <span className="w-0.5 min-h-full bg-secondary"></span>
          <TabsTrigger
            value="water"
            className={
              ColorLogToggle === "water"
                ? "tile font-bold bg-primary px-4 rounded-md shadow-inner md:text-sm shadow-black/10"
                : "tile bg-transparent shadow-none px-4 rounded-md"
            }
            onClick={() => {
              setColorLogToggle("water");
            }}
          >
            Water Log
          </TabsTrigger>
          <span className="w-0.5 min-h-full bg-secondary"></span>
          <TabsTrigger
            value="cycle"
            className={
              ColorLogToggle === "cycle"
                ? "tile font-bold bg-primary px-4 rounded-md shadow-inner md:text-sm shadow-black/10"
                : "tile bg-transparent shadow-none px-4 rounded-md"
            }
            onClick={() => {
              setColorLogToggle("cycle");
              showCircleModal();
            }}
          >
            Cycle Log
          </TabsTrigger>
          <span className="w-0.5 min-h-full bg-secondary"></span>
          <TabsTrigger
            value="mood"
            className={
              ColorLogToggle === "mood"
                ? "tile font-bold bg-primary px-4 rounded-md shadow-inner shadow-black/10"
                : "tile bg-transparent shadow-none px-4 rounded-md"
            }
            onClick={() => {
              setColorLogToggle("mood");
              showMoodModal();
            }}
          >
            Mood Log
          </TabsTrigger>
        </TabsList>
        <TabsContent value="food" className="">
          <div className="grid min-h-full grid-cols-2 grid-rows-2 gap-2">
            <div
              className="flex items-center justify-start gap-3 p-3 rounded-md shadow-md cursor-pointer "
              onClick={(event) => handleAddClick(event, "breakfast")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="p-3 rounded-full bg-primary"
                width={40}
                height={40}
              />
              <div htmlFor="name">Breakfast</div>
            </div>
            <div
              className="flex items-center justify-start gap-3 p-3 rounded-md shadow-md cursor-pointer"
              onClick={(event) => handleAddClick(event, "Lunch")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="p-3 rounded-full bg-primary hover:bg-primarylight"
                width={40}
                height={40}
              />
              <div htmlFor="name">Lunch</div>
            </div>
            <div
              className="flex items-center justify-start gap-3 p-3 rounded-md shadow-md cursor-pointer"
              onClick={(event) => handleAddClick(event, "Dinner")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="p-3 rounded-full bg-primary"
                width={40}
                height={40}
              />
              <div htmlFor="name">Dinner</div>
            </div>
            <div
              className="flex items-center justify-start gap-3 p-3 rounded-md shadow-md cursor-pointer"
              onClick={(event) => handleAddClick(event, "snack")}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="p-3 rounded-full bg-primary"
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
              className="flex items-center justify-start w-full gap-3 p-3 rounded-md shadow-md"
              onClick={(event) => {
                event.preventDefault();
                waterModal.current.showModal();
              }}
            >
              <Image
                src="/icons/add.png"
                alt="add symbol"
                className="p-3 rounded-full bg-primary"
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
