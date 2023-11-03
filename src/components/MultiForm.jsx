"use client";
import Button from "./Button.jsx";
import { useRef, useState } from "react";

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
        <select
          {...register("gender", { required: "Gender is required" })}
          className="font-opensans px-3"
        >
          <option className="opacity-70 font-semibold" value="" disabled>
            Select a gender
          </option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <p className="text-rose-600 text-sm">{errors.gender?.message}</p>
        <input
          placeholder={"Date of Birth*"}
          type={type}
          onFocus={handleFocus}
          {...register("date", { required: true })}
        />
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
        <div className="grid place-items-center">
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

// food category
export function FoodCategories({ onClick, onClickPrev }) {
  const foodTypeInformation = [
    { type: "vegan", description: "No animal products." },
    { type: "vegetarian", description: "Plant-based diet without meat." },
    { type: "omnivore", description: "Eats both plants and animals." },
    {
      type: "paleo",
      description: "Emphasizes whole foods, like our ancestors.",
    },
    { type: "pescatarian", description: "Vegetarian with fish and seafood." },
    { type: "carnivore", description: "Primarily meat-based diet." },
    {
      type: "flexitarian",
      description: "Mainly plant-based with occasional meat.",
    },
    { type: "keto", description: "High-fat, low-carb diet for ketosis." },
    { type: "gluten-free", description: "Avoids gluten-containing foods." },
    { type: "lactose-free", description: "Avoids lactose in dairy products." },
    { type: "dairy-free", description: "Excludes all dairy products." },
    {
      type: "shellfish-free",
      description: "Avoids shellfish due to allergies.",
    },
    { type: "soy-free", description: "Excludes soy-based foods." },
    { type: "allergen-free", description: "Avoids common allergens." },
    { type: "low-carb", description: "Restricts carbohydrates." },
    { type: "mediterranean", description: "Based on Mediterranean cuisine." },
    { type: "low-fat", description: "Emphasizes low-fat foods." },
    { type: "low-sugar", description: "Limits sugar intake." },
    { type: "low-food", description: "Reduces overall food consumption." },
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
    console.log(Object.keys(FoodTypeRefs.current));
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
            close
          </button>
        </div>
      </dialog>
      {/*  */}
      <div className="flex flex-col justify-center items-left gap-3 min-w-full min-h-fit p-2 rounded-md flex-1">
        <h1 className="grid place-items-center text-secondary">
          Help with information about you
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
            none
          </button>
          {foodTypeInformation
            .slice(0, 10)
            ?.filter((food) => food.type.includes(searchValue))
            .map((food, idx) => {
              return (
                <div key={idx}>
                  <div
                    className="tile"
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
          <Button onClick={onClickPrev}>Previous</Button>
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

//allergies
export function Allergies({ onClick, onClickPrev }) {
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
            close
          </button>
        </div>
      </dialog>
      <div className="flex flex-col justify-center items-left gap-3 min-w-full min-h-fit p-2 rounded-md flex-1">
        <h1 className="grid place-items-center text-secondary">
          Any Allergies
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
            none
          </button>
          {Allergies.map((allergy, idx) => {
            return (
              <div key={idx}>
                <div
                  className="tile"
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
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

// chronic conditions
export function ChronicConditions({ onClick, onClickPrev }) {
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
            close
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
              alt="add icon"
              width={20}
              height={20}
            />
            none
          </button>
          {chronicConditions.map((condition, idx) => {
            return (
              <div key={idx}>
                <div
                  className="tile"
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
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

//Accessibility Settings
export function Accessibility({ onClick, onClickPrev }) {
  const settings = [
    { value: "font Size", src: "/icons/add.png", alt: "add icon" },
    { value: "use bold Text", src: "/icons/bold.png", alt: "capital b" },
    { value: "dark Mode", src: "/icons/day-and-night.png", alt: "dark mode" },
    {
      value: "use Descriptive Links",
      src: "/icons/information.png",
      alt: "descriptive links",
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
        <h1 className="grid place-items-center text-secondary">
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
            none
          </button>
          {settings.map((setting, idx) => {
            return (
              <div key={idx}>
                <div
                  className="tile"
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
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <Button onClick={onClick}>next</Button>
        </div>
      </div>
    </>
  );
}

// adding daily intake
export function DailyIntake({ onClickPrev, handleSubmit }) {
  const modal = useRef(null);
  const foodName = useRef(null);
  const foodDescription = useRef(null);
  const aDrink = useRef(null);

  const [breakFast, setBreakFast] = useState([]);
  const [Lunch, setLunch] = useState([]);
  const [Dinner, setDinner] = useState([]);

  const [type, setType] = useState("");

  const handleModalclose = (event) => {
    event.preventDefault();
    modal.current.close();
  };
  const handleAddClick = (event, type) => {
    event.preventDefault();
    modal.current.showModal();
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
        setBreakFast([...breakFast, foodInformation]);
        break;
      case "lunch":
        setLunch([...Lunch, foodInformation]);
        break;
      default: // super
        setDinner([...Dinner, foodInformation]);
        break;
    }
    // do not need to clear drink because water is the default
    (foodName.current.value = ""),
      (foodDescription.current.value = ""),
      handleModalclose(event);
  };
  return (
    <>
      <dialog
        ref={modal}
        className="w-[35%] h-fit bg-white rounded-md relative p-1"
      >
        <div className="p-2 grid place-items-center gap-1">
          <h1 className="grid place-items-center text-secondary">
            Did you have any thing today?
            <p>{type.toUpperCase()}</p>
          </h1>
          <div className="gap-2">
            <input type="text" placeholder="Food name" ref={foodName} />
            <input
              type="text"
              placeholder="Food description"
              className="my-2"
              ref={foodDescription}
            />
            <input
              type="text"
              placeholder="a drink? water maybe"
              defaultValue={"water"}
              ref={aDrink}
            />
          </div>
          <div className="flex justify-around items-center mt-2 w-full">
            <button onClick={handleAddFood} className="tile">
              add
            </button>
            <button onClick={handleModalclose} className="tile">
              close
            </button>
          </div>
        </div>
      </dialog>
      <div className="min-w-full pb-2">
        <h1 className="grid place-items-center text-secondary">
          Did you have any thing today?
        </h1>
        <div className="grid grid-rows-3 grid-cols-1 p-1 rounded-md">
          <div className=" bg-white rounded-md flex flex-col p-3 shadow-2xl">
            <h1>BreakFast</h1>
            <div className="min-w-full p-1 flex justify-left items-center gap-1">
              <div
                className="aspect-[1/1] w-[60px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "breakfast")}
              >
                <img
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                ></img>
              </div>
              {breakFast.map((food, idx) => {
                return (
                  <div key={idx}>
                    <div className="border-secondary border-2 aspect-[1/1] min-w-fit w-[60px] rounded-md bg-white shadow-xl flex justify-center items-center text-center px-2 cursor-pointer">
                      {food?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-md flex flex-col p-3 shadow-2xl my-1">
            <h1>Lunch</h1>
            <div className="min-w-full p-1 flex justify-left items-center gap-1">
              <div
                className="aspect-[1/1] w-[60px] rounded-md bg-white  shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "lunch")}
              >
                <img
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                ></img>
              </div>
              {Lunch.map((food, idx) => {
                return (
                  <div key={idx}>
                    <div className="aspect-[1/1] w-[60px] rounded-md text-sm bg-white shadow-xl flex justify-center items-center text-center p-2 cursor-pointer">
                      {food?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-md flex flex-col p-3 shadow-2xl">
            <h1>Dinner</h1>
            <div className="min-w-full p-1 flex justify-left items-center gap-1">
              <div
                className="aspect-[1/1] w-[60px] rounded-md bg-white shadow-xl grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={(event) => handleAddClick(event, "dinner")}
              >
                <img
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                ></img>
              </div>
              {Dinner.map((food, idx) => {
                return (
                  <div key={idx}>
                    <div className="aspect-[1/1] w-[60px] rounded-md bg-white shadow-xl flex justify-center items-center text-center p-2 cursor-pointer">
                      {food?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <Button onClick={handleSubmit}>done</Button>
        </div>
      </div>
    </>
  );
}

// function TemplateForm({ onClick, onClickPrev, handleSubmit }) {}
