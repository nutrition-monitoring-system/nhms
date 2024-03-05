"use client";
import { useCallback, useMemo, useState } from "react";
import "./index.css";
import { useSearchParams } from "next/navigation";

const DEFAULT_INTENSITY = 5;

export default function Symptoms() {
  const searchParams = useSearchParams();
  const selected = useMemo(
    () => searchParams.get("selected")?.split(","),
    [searchParams]
  );

  const [symptomMap, setSymptomMap] = useState(
    selected.map((i) => ({ name: i, intensity: DEFAULT_INTENSITY }))
  );
  const updateSymptom = useCallback((name, value) => {
    setSymptomMap((prev) =>
      prev.map((i) => (i.name === name ? { ...i, intensity: value } : i))
    );
  }, []);

  const handleSubmit = useCallback(() => {
    console.log(symptomMap);
  }, [symptomMap]);

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-4 py-4">
        <h1 className="text-4xl font-bold">Symptoms:</h1>

        <div className="w-1/2 my-4 p-6 rounded-lg flex items-center flex-col gap-12 font-bold text-xl bg-primary">
          {symptomMap.map((i) => (
            <SymptomIntensityInput
              key={i.name}
              name={i.name}
              value={i.intensity}
              onChange={(e) => updateSymptom(i.name, e.target.value)}
            />
          ))}
        </div>

        <div className="flex justify-end w-1/2">
          <button
            className="bg-black text-white p-2 px-10 rounded-lg text-xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

function SymptomIntensityInput({ value, onChange, name }) {
  return (
    <div className="w-full">
      <h2 className="self-start underline">Intensity</h2>

      <div className="w-full mt-6 flex flex-col gap-4">
        <h2 className="self-start">{name}</h2>

        <div>
          <div className="w-full flex justify-between">
            <span className="w-[10px] flex justify-center">1</span>
            <span className="w-[26px] flex justify-center">5</span>
            <span className="w-[26px] flex justify-center">10</span>
          </div>
          <input
            type="range"
            value={value}
            min="1"
            max="10"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
