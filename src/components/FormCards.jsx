import Button from "./Button.jsx";
export function FormOne({ onClick }) {
  return (
    <>
      <div className="flex flex-col justify-center items-left gap-3 min-w-full p-3 rounded-md">
        <div className="flex gap-2">
          <input type={"text"} placeholder={"First Name"}></input>
          <input type={"text"} placeholder={"Last Name"}></input>
        </div>
        <input type={"Date"} placeholder={"Date of Birth"}></input>
        <input type={"text"} placeholder={"Username or Email"}></input>
        <input type={"password"} placeholder={"Password"}></input>
        <input type={"password"} placeholder={"Confirm Password"}></input>
        <div className="grid place-items-center">
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

export function FormTwo({ onClick, onClickPrev }) {
  const foodTypeInformation = [
    "vegan",
    "vegetarian",
    "omnivore",
    "paleo",
    "pescatarian",
    "carnivore",
    "flexiterian",
    "keto",
    "gluten-free",
    "lactose-free",
    "dairy-free",
    "shellfish-free",
    "soy-free",
    "allergen-free",
    "low-carb",
    "mediterranean",
    "low-fat",
    "low-sugar",
    "low-food",
  ];
  return (
    <>
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
          />
        </div>
        <div className="min-h-fitrounded-md flex flex-wrap justify-center items-center gap-2 w-full">
          {foodTypeInformation.slice(0, 10).map((food, idx) => {
            return (
              <>
                <button className="tile" key={idx}>
                  <img
                    src="/icons/info.png"
                    alt="information icon"
                    width={20}
                    height={20}
                  />
                  {food}
                </button>
              </>
            );
          })}
          <button className="tile">
            <img
              src="/icons/full-screen.png"
              alt="go full screen icon"
              width={20}
              height={20}
            />
            more...
          </button>
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

export function FormThree({ onClick, onClickPrev }) {
  const Allergies = [
    "Peanut",
    "Tree Nut",
    "Milk",
    "Mustard",
    "Fish",
    "Egg",
    "Soy",
    "Wheat",
    "Sesame",
    "corn",
    "shellfish",
    "Meat",
  ];
  return (
    <>
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
          />
        </div>
        <div className="min-h-fitrounded-md flex flex-wrap justify-center items-center gap-2 w-full">
          {Allergies.slice(0, 10).map((allergy, idx) => {
            return (
              <>
                <button className="tile" key={idx}>
                  <img
                    src="/icons/info.png"
                    alt="information icon"
                    width={20}
                    height={20}
                  />
                  {allergy}s
                </button>
              </>
            );
          })}
          <button className="tile">
            <img
              src="/icons/full-screen.png"
              alt="go full screen icon"
              width={20}
              height={20}
            />
            more...
          </button>
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}

export function FormFour({ onClick, onClickPrev }) {
  const chronicConditions = [
    "Peanut",
    "Tree Nut",
    "Milk",
    "Mustard",
    "Fish",
    "Egg",
    "Soy",
    "Wheat",
    "Sesame",
    "corn",
    "shellfish",
    "Meat",
  ];
  return (
    <>
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
          />
        </div>
        <div className="min-h-fitrounded-md flex flex-wrap justify-center items-center gap-2 w-full">
          {chronicConditions.slice(0, 10).map((condition, idx) => {
            return (
              <>
                <button className="tile" key={idx}>
                  <img
                    src="/icons/info.png"
                    alt="information icon"
                    width={20}
                    height={20}
                  />
                  {condition}
                </button>
              </>
            );
          })}
          <button className="tile">
            <img
              src="/icons/full-screen.png"
              alt="go full screen icon"
              width={20}
              height={20}
            />
            more...
          </button>
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <Button onClick={onClickPrev}>Previous</Button>
          <Button onClick={onClick}>Next</Button>
        </div>
      </div>
    </>
  );
}
