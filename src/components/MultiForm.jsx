"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "./Button.jsx";
import { useEffect, useRef, useState } from "react";

// personal information
export function PersonalInformation({ onClick, formValidation, resetIndex }) {
  /*

  params: 
  - onClick : (event) => void -> callback to handle click event on submit button
  - formValidation : ()=>object -> returns a object containing functions for handling form validation
   */

  // Form validation callback functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formValidation;

  // This portion configures the input type for date and time as 'datetime'.
  // Issue: <input type="datatime"> This approach doesn't support placeholder variables.
  // Resolution:
  // Change the input type to text with a placeholder "date of birth" and use a click or focus event to trigger handleclick, which will set the type back to datetime.
  const [type, setType] = useState("text");

  const handleFocus = (event) => {
    // Change the input type to text with a placeholder "date of birth" and use a click or focus event to trigger handleclick, which will set the type back to datetime.
    event.preventDefault();
    setType("date");
  };
  useEffect(() => {
    resetIndex(errors);
  }, [errors]);

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
          {/* Displaying the error message*/}
          <p className="text-rose-600 text-sm">{errors.firstName?.message}</p>
          <p className="text-rose-600 text-sm">{errors.lastName?.message}</p>
        </div>
        <div className="relative h-fit py-7 shadow-sm rounded-lg">
          <select
            {...register("gender", { required: "Gender is required" })} //making sure the user types the right dataype
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
        <p className="text-rose-600 text-sm">{errors.gender?.message}</p>{" "}
        {/* Displaying the error message*/}
        <div className="relative flex sm:py-7 shadow-sm rounded-md">
          <input
            placeholder={"Date of Birth*"}
            type={type}
            className="sm:flex-1 sm:absolute sm:inset-0 sm:bg-primarylight"
            onFocus={handleFocus}
            {...register("date", { required: true })} //making sure the user types the right dataype
          />
        </div>
        {/* Displaying the error message*/}
        <p className="text-rose-600 text-sm">{errors.date?.message}</p>
        <input
          type={"text"}
          placeholder={"Email Address*"}
          {...register("email", { required: true })} //making sure the user types the right dataype
        />
        {/* Displaying the error message*/}
        <p className="text-rose-600 text-sm">{errors.email?.message}</p>
        <input
          type={"password"}
          placeholder={"Password*"}
          {...register("password", { required: true })} //making sure the user types the right dataype
        />
        {/* Displaying the error message*/}
        <p className="text-rose-600 text-sm">{errors.password?.message}</p>
        <input
          type={"password"}
          placeholder={"Confirm Password*"}
          {...register("confirmPassword", { required: true })} //making sure the user types the right dataype
        />
        <p className="text-rose-600 text-sm">
          {/* Displaying the error message*/}
          {errors.confirmPassword?.message}
        </p>
        <div className="grid place-items-center" id="RestrictionsNext">
          <Button onClick={handleSubmit(onClick)}>Next</Button>
        </div>
      </div>
    </>
  );
}

// food category
export function FoodCategories({ onClick, onClickPrev, handleCollectData }) {
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

export function Allergies({ onClick, onClickPrev, handleCollectData }) {
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

export function ChronicConditions({ onClick, onClickPrev, handleCollectData }) {
  //Chronic conditions
  // Component to handle chronic condition selection
  // Params:
  //   onClick: Function to handle click events
  //   onClickPrev: Function to handle click events for going back
  //   handleCollectData: Function to handle collecting data
  // List of available allergies with types and descriptions
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
  // Accessibility Settings
  // Component to handle Accessiblity Settings selection
  // Params:
  //   onClick: Function to handle click events
  //   onClickPrev: Function to handle click events for going back
  //   handleCollectData: Function to handle collecting data
  // List of available allergies with types and descriptions
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
export function DailyIntake({ onClickPrev, handleSubmit }) {
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
                <img
                  src={"/icons/add.png"}
                  alt={"Add img icon"}
                  width={20}
                  height={20}
                ></img>
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
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
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
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
                <img
                  src={"/icons/mood.png"}
                  alt={"Mood icon"}
                  width={40}
                  height={40}
                ></img>
              </div>
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
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
              <div className="relative aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]">
                <img
                  src={uploadImageUrl}
                  alt={"Add img icon"}
                  width={30}
                  height={30}
                ></img>
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
            <Button onClick={handleSubmit} type="submit">
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
