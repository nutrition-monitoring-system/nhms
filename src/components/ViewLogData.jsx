import { useEffect, useState } from "react";

export default function ViewLogData() {
  // const [foodWaterLog, setFoodWaterLog] = useState(
  //   JSON.parse(localStorage.getItem("food_water_log")) || []
  // );
  const [chronicConditions, setChronicConditions] = useState([]);
  const [accessibility, setAccessibility] = useState([]);
  // const [symptoms, setSymptoms] = useState(
  //   JSON.parse(localStorage.getItem("symptoms")) || []
  // );
  const [allergies, setAllergies] = useState([]);
  const [diet, setDiet] = useState([]);

  useEffect(() => {
    try {
      /* This needs to remove any duplicates. */
      setChronicConditions(
        JSON.parse(localStorage.getItem("chronicConditions")) || []
      );
      setChronicConditions()
      setAccessibility(
        JSON.parse(localStorage.getItem("accessibility_Settings")) || []
      );
      //setSymptoms(JSON.parse(localStorage.getItem("symptoms")) || []);
      setAllergies(JSON.parse(localStorage.getItem("allergies")) || []);
      setDiet(JSON.parse(localStorage.getItem("diet") || []));
    } catch (e) {
      //console.log(e);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full p-2 bg-gray-100">
      <h1 className="grid p-3 font-extrabold text-black place-items-center text-[1.3rem]">
        User Logs
      </h1>
      <div className="grid items-center justify-around w-full grid-cols-4 gap-3 p-2 md:grid-cols-1 md:grid-rows-4 md:w-full">
        <div className="min-h-full p-1 rounded-md bg-primary md:w-[100%]">
          <h1 className="grid p-3 font-extrabold text-black text-md place-items-center">
            Chronic Conditions
          </h1>
          <div className="flex flex-col gap-1 p-1">
            {Object.keys(chronicConditions).length === 0 ? (
              <div className="grid place-items-center">No items available</div>
            ) : (
              chronicConditions?.map((item, idx) => {
                return (
                  <div className="py-3 tile" key={idx}>
                    {item}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="min-h-full p-1 rounded-md bg-primary md:w-[100%]">
          <h1 className="grid p-3 font-extrabold text-black text-md place-items-center">
            Accessibility
          </h1>
          <div className="flex flex-col gap-1 p-1">
            {Object.keys(accessibility).length === 0 ? (
              <div className="grid place-items-center">No items available</div>
            ) : (
              accessibility?.map((item, idx) => {
                return (
                  <div className="py-3 tile" key={idx}>
                    {item}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="min-h-full p-1 rounded-md bg-primary md:w-[100%]">
          <h1 className="grid p-3 font-extrabold text-black text-md place-items-center">
            Dietary Restrictions
          </h1>
          <div className="flex flex-col gap-1 p-1">
            {Object.keys(diet).length === 0 ? (
              <div className="grid place-items-center">No items available</div>
            ) : (
              diet?.map((item, idx) => {
                return (
                  <div className="py-3 tile" key={idx}>
                    {item}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="min-h-full p-1 rounded-md bg-primary md:w-[100%]">
          <h1 className="grid p-3 font-extrabold text-black text-md place-items-center">
            Allergies
          </h1>
          <div className="flex flex-col gap-1 p-1">
            {Object.keys(allergies).length === 0 ? (
              <div className="grid place-items-center">No items available</div>
            ) : (
              allergies?.map((item, idx) => {
                return (
                  <div className="py-3 tile" key={idx}>
                    {item}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
