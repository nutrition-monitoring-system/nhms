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
            <FoodAndWaterLog />
          </div>
          <div className="flex flex-col p-3 my-1 rounded-md shadow-lg bg-primarylight">
            <div className="flex items-center justify-around gap-3">
              <h1>Mood</h1>
              <h1>Exercise</h1>
            </div>
            <div className="flex items-center justify-around min-w-full gap-3 p-1">
              <div
                className="aspect-[1/1] w-[70px] rounded-md bg-white shadow-lg grid place-items-center cursor-pointer outline-primary outline-2 outline-offset-[-10px]"
                onClick={
                  (event) => {}
                  //event.preventDefault() && moodModal.current.showModal()
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
                onClick={
                  (event) => {}
                  //event.preventDefault() && exerciseModal.current.showModal()
                }
              >
                <Image
                  src={"/icons/workout.png"}
                  alt={"workout icon"}
                  width={40}
                  height={40}
                />
              </div>
            </div>
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
