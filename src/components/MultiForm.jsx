"use client";
import Button from "./Button.jsx";
import { useEffect, useRef, useState } from "react";

// personal information
export function PersonalInformation({ onClick, formValidation }) {
  // for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formValidation;

  const [type, setType] = useState("text");

  const handleFocus = (event) => {
    event.preventDefault();
    setType("date");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-left gap-2 min-w-full p-3 rounded-md">
        <div className="flex gap-2">
          <input
            type={"text"}
            placeholder={"First Name*"}
            id="name"
            {...register("firstName", { required: true })}
          />
          <input
            type={"text"}
            placeholder={"Last Name*"}
            {...register("lastName", { required: true })}
          />
        </div>
        <div className="flex gap-2 justify-between">
          <p className="text-rose-600 text-sm">{errors.firstName?.message}</p>
          <p className="text-rose-600 text-sm">{errors.lastName?.message}</p>
        </div>
        <div className="relative h-fit py-7 shadow-sm rounded-lg">
          <select
            {...register("gender", { required: "Gender is required" })}
            className="absolute inset-0"
          >
            <option className="opacity-70 font-semibold" value="">
              Select a gender*
            </option>
            <option className="pl-3" value="male">
              Male
            </option>
            <option className="pl-3" value="female">
              Female
            </option>
            <option className="pl-3" value="other">
              Other
            </option>
          </select>
        </div>
        <p className="text-rose-600 text-sm">{errors.gender?.message}</p>
        <div className="relative flex sm:py-7 shadow-sm rounded-md">
          <input
            placeholder={"Date of Birth*"}
            type={type}
            className="sm:flex-1 sm:absolute sm:inset-0 sm:bg-primarylight"
            onFocus={handleFocus}
            {...register("date", { required: true })}
          />
        </div>
        <p className="text-rose-600 text-sm">{errors.date?.message}</p>
        <input
          type={"text"}
          placeholder={"Email Address*"}
          {...register("email", { required: true })}
        />
        <p className="text-rose-600 text-sm">{errors.email?.message}</p>
        <input
          type={"password"}
          placeholder={"Password*"}
          {...register("password", { required: true })}
        />
        <p className="text-rose-600 text-sm">{errors.password?.message}</p>
        <input
          type={"password"}
          placeholder={"Confirm Password*"}
          {...register("confirmPassword", { required: true })}
        />
        <p className="text-rose-600 text-sm">
          {errors.confirmPassword?.message}
        </p>
        <div className="grid place-items-center" id="RestrictionsNext">
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

// food category
export function FoodCategories({ onClick, onClickPrev, handleCollectData }) {
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

  const modal = useRef(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [userSelected, SetUserSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef(null);
  const handleOnChange = () => {
    setSearchValue(inputRef.current.value);
  };
  const handleModalclose = (event) => {
    event.preventDefault();
    modal.current.close();
  };
  const handleModalclick = (event, type, description) => {
    event.preventDefault();
    modal.current.showModal();
    setType(type);
    setDescription(description);
  };

  const noneButtonRef = useRef(null);
  const FoodTypeRefs = useRef({});

  const handleNone = (event) => {
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");
    event.preventDefault();
    Object.keys(FoodTypeRefs.current).forEach((key) => {
      FoodTypeRefs.current[key].classList.remove("bg-secondary");
    });
    SetUserSelected([]);
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  const handleOptionClick = (refIdx) => {
    FoodTypeRefs.current[refIdx].classList.toggle("bg-secondary");
    handleNone(null);
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
        <h1 className="grid place-items-center text-secondary">
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

//allergies
export function Allergies({ onClick, onClickPrev, handleCollectData }) {
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

  const modal = useRef(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [userSelected, SetUserSelected] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef(null);
  const handleOnChange = () => {
    setSearchValue(inputRef.current.value);
  };

  const handleModalclose = (event) => {
    event.preventDefault();
    modal.current.close();
  };
  const handleModalclick = (event, type, description) => {
    event.preventDefault();
    modal.current.showModal();
    setType(type);
    setDescription(description);
  };

  const noneButtonRef = useRef(null);
  const AllergyRefs = useRef({});

  const handleNone = (event) => {
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");
    event.preventDefault();
    Object.keys(AllergyRefs.current).forEach((key) => {
      AllergyRefs.current[key].classList.remove("bg-secondary");
    });
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  const handleOptionClick = (refIdx) => {
    AllergyRefs.current[refIdx].classList.toggle("bg-secondary");
    handleNone(null);
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
        <h1 className="grid place-items-center text-secondary">
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

// chronic conditions
export function ChronicConditions({ onClick, onClickPrev, handleCollectData }) {
  const chronicConditions = [
    { type: "Diabetes", description: "Affects blood sugar regulation." },
    { type: "Hypertension", description: "High blood pressure." },
    {
      type: "Asthma",
      description: "Respiratory condition causing breathing difficulties.",
    },
    { type: "Heart Disease", description: "Cardiovascular health issues." },
    { type: "Arthritis", description: "Inflammation of the joints." },
    { type: "Cancer", description: "Abnormal cell growth." },
    {
      type: "Alzheimer's",
      description: "Progressive memory loss and cognitive decline.",
    },
    { type: "Chronic Pain", description: "Persistent, long-term pain." },
    { type: "Osteoporosis", description: "Weakening of bones." },
    { type: "Obesity", description: "Excessive body weight." },
    {
      type: "Chronic Kidney Disease",
      description: "Kidney function impairment.",
    },
    { type: "COPD", description: "Chronic lung diseases like emphysema." },
  ];

  const modal = useRef(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [userSelected, SetUserSelected] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef(null);
  const handleOnChange = () => {
    setSearchValue(inputRef.current.value);
  };

  const handleModalclose = (event) => {
    event.preventDefault();
    modal.current.close();
  };
  const handleModalclick = (event, type, description) => {
    event.preventDefault();
    modal.current.showModal();
    setType(type);
    setDescription(description);
  };

  const noneButtonRef = useRef(null);
  const ConditionRefs = useRef({});

  const handleNone = (event) => {
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");
    event.preventDefault();
    Object.keys(ConditionRefs.current).forEach((key) => {
      ConditionRefs.current[key].classList.remove("bg-secondary");
    });
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  const handleOptionClick = (refIdx) => {
    ConditionRefs.current[refIdx].classList.toggle("bg-secondary");
    handleNone(null);
    SetUserSelected([...userSelected, chronicConditions[refIdx].type]);
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
        <h1 className="grid place-items-center text-secondary">
          Chronic Conditions
        </h1>
        <div className="relative flex items-center gap-1 p-2">
          <img src="/icons/add.png" alt="add symbol" width={20} height={20} />
          <input
            type="text conditions"
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
                  <img
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
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <div id="conditionsNext">
            <Button
              onClick={(event) => {
                handleCollectData({ chronicConditions: userSelected });
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

//Accessibility Settings
export function Accessibility({ onClick, onClickPrev, handleCollectData }) {
  const settings = [
    { value: "Font Size", src: "/icons/add.png", alt: "add icon" },
    { value: "Use Bold Text", src: "/icons/bold.png", alt: "capital b" },
    { value: "Dark Mode", src: "/icons/day-and-night.png", alt: "dark mode" },
    {
      value: "Use Descriptive Links",
      src: "/icons/information.png",
      alt: "Descriptive Links",
    },
    {
      value: "High Contrast Mode",
      src: "/icons/adjustment.png",
      alt: "High contrast mode",
    },
    { value: "Alt for images", src: "/icons/image.png", alt: "alt for images" },
  ];
  const [userSelected, SetUserSelected] = useState([]);

  const noneButtonRef = useRef(null);
  const SettingsRef = useRef({});

  const handleNone = (event) => {
    if (event === null)
      return noneButtonRef.current.classList.remove("bg-secondary");
    event.preventDefault();
    Object.keys(SettingsRef.current).forEach((key) => {
      SettingsRef.current[key].classList.remove("bg-secondary");
    });
    return noneButtonRef.current.classList.toggle("bg-secondary");
  };

  const handleOptionClick = (refIdx) => {
    SettingsRef.current[refIdx].classList.toggle("bg-secondary");
    handleNone(null);
    SetUserSelected([...userSelected, settings[refIdx].type]);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-left gap-3 min-w-full min-h-fit p-2 rounded-md flex-1">
        <h1 className="grid place-items-center text-secondary text-center">
          Accessiblity Settings
        </h1>
        <div className="relative flex items-center gap-1 p-2">
          <img src="/icons/add.png" alt="add symbol" width={20} height={20} />
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
            <img
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
                  <img
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
/* Daily Food form.  */
// adding daily intake
export function DailyIntake({ onClickPrev, handleSubmit }) {
  const foodModal = useRef(null);
  const exerciseModal = useRef(null);
  const moodModal = useRef(null);
  const foodName = useRef(null);
  const foodDescription = useRef(null);
  const aDrink = useRef(null);

  const [uploadImageUrl, setUploadImageUrl] = useState("/icons/image.png");

  const [breakfast, setBreakFast] = useState([]);
  const [Lunch, setLunch] = useState([]);
  const [Dinner, setDinner] = useState([]);

  const [type, setType] = useState("");

  const handleModalclose = (event) => {
    event.preventDefault();
    foodModal.current.close();
  };
  const handleAddClick = (event, type) => {
    event.preventDefault();
    foodModal.current.showModal();
    setType(type);
  };
  const handleAddFood = (event) => {
    event.preventDefault();
    const foodInformation = {
      name: foodName.current.value,
      description: foodDescription.current.value,
      drink: aDrink.current.value,
    };
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
    // do not need to clear drink because water is the default
    (foodName.current.value = ""),
      (foodDescription.current.value = ""),
      handleModalclose(event);
  };

  function handleUploadImage(event) {
    const file = event.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();
    reader.onload = function (e) {
      // The *.txt file text will be printed here
      console.log("Filename", fileName);
    };
    reader.readAsDataURL(file);

    useEffect(()=> {
      const eventId = addEventListener("onload", setUploadImageUrl())
      return () => {

      }
    })
  }
  return (
    <>
      <dialog
        ref={foodModal}
        className="w-[35%] h-fit bg-white rounded-md relative p-1 sm:w-[90%]"
      >
        <div className="p-2 grid place-items-center gap-1">
          <h1 className="grid place-items-center font-extrabold text-xl">
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

      <div className="min-w-full pb-2">
        <h1 className="grid place-items-center text-secondary">
          Did you have anything today?
        </h1>
        <div className="grid grid-rows-3 grid-cols-1 p-1 rounded-md">
          <div className=" bg-white rounded-md flex flex-col p-3 shadow-2xl">
            <div className="flex items-center justify-around gap-3">
              <h1>Breakfast</h1>
              <h1>Lunch</h1>
              <h1>Dinner</h1>
            </div>
            <div className="min-w-full p-1 flex justify-around items-center gap-3">
              <div
                id="addBreakFast"
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "breakfast")}
              >
                <img
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                ></img>
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "lunch")}
              >
                <img
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                ></img>
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "dinner")}
              >
                <img
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                ></img>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md flex flex-col p-3 shadow-2xl my-1">
            <div className="flex items-center justify-around gap-3">
              <h1>Mood</h1>
              <h1>Exercise</h1>
              <h1>Upload</h1>
            </div>
            <div className="min-w-full p-1 flex justify-around items-center gap-3">
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) =>
                  event.preventDefault() && moodModal.current.showModal()
                }
              >
                <img
                  src={"/icons/mood.png"}
                  alt={"Mood icon"}
                  width={40}
                  height={40}
                ></img>
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) =>
                  event.preventDefault() && exerciseModal.current.showModal()
                }
              >
                <img
                  src={"/icons/workout.png"}
                  alt={"workout icon"}
                  width={40}
                  height={40}
                ></img>
              </div>
              <div className="relative aspect-[1/1] w-[70px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]">
                <img
                  src={uploadImageUrl}
                  alt={"Add img icon"}
                  width={30}
                  height={30}
                ></img>
                <input
                  type="file"
                  class="absolute inset-0 opacity-0"
                  onChange={handleUploadImage}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md flex flex-col p-3 shadow-2xl">
            <div className="min-w-full p-1 flex justify-left items-center gap-2 overflow-hidden">
              {[...breakfast, ...Lunch, ...Dinner].map((food, idx) => {
                return (
                  <div key={idx}>
                    <div className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-xl flex justify-center items-center text-center p-2 cursor-pointer">
                      <img src="/icons/headerIcons/hamburger.png" />
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
            <Button onClick={handleSubmit}>Done</Button>
          </div>
        </div>
      </div>
    </>
  );
}

// function TemplateForm({ onClick, onClickPrev, handleSubmit }) {}
