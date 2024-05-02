import Image from "next/image";
import FoodAndWaterLog from "./FoodAndWaterLog.jsx";

export default function DailyIntake({ onClickNext, onClickPrev }) {
  /* Daily Food form.  */
  // adding daily intake
  // Component to handle daily food intake
  // Params:
  //   onClickPrev: Function to handle click events for going back
  //   handleSubmit: Function to handle form submission

  return (
    <>
      <div className="min-w-full pb-2 mx-auto">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Did you have anything today?
        </h1>
        <div className="grid grid-cols-1 grid-rows-3 p-1 rounded-md">
          <div className="row-span-2 p-2 rounded-md shadow-lg">
            <FoodAndWaterLog showMenstrualMood={true}/>
          </div>
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <button className="tile" onClick={onClickPrev}>
            Previous
          </button>
          <button className="tile" id="DoneNext" onClick={onClickNext}>
            Finish
          </button>
        </div>
      </div>
    </>
  );
}
