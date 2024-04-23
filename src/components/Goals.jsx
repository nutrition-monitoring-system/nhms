"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
export default function Goals() {
  const [goals, setGoals] = useState([]);
  const inputRef = useRef(null);
  const handleAddGoal = (event) => {
    event.preventDefault();
    if (inputRef.current.value.length < 1) {
      alert("Please enter a goal");
      return;
    }
    console.log(goals);
    if (goals.includes(inputRef.current.value)) {
      alert("Goal already exists");
      return;
    }
    setGoals([...goals, inputRef.current.value]);
    inputRef.current.value = "";
    localStorage.setItem("goals", JSON.stringify(goals));
  };
  const handleDeleteGoal = (event, goalIdx) => {
    event.preventDefault();
    const new_goals = goals.filter((value, idx) => idx !== goalIdx);
    localStorage.setItem("goals", JSON.stringify(new_goals));
    setGoals(new_goals);
  };
  useEffect(() => {
    try {
      setGoals(JSON.parse(localStorage.getItem("goals")) || []);
    } catch (error) {
      //console.log(error);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-gray-100">
      <h1 className="grid place-items-center text-black p-3 font-extrabold text-[1.3rem]">
        Personal Goals
      </h1>
      <div className="bg-primary min-h-fit w-[40%] md:w-full p-2 rounded-md">
        <div className="flex flex-col items-center justify-center gap-2 mb-2 rounded-md min-h-fit">
          {goals?.map((value, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between w-full gap-2 p-4 bg-white rounded-md shadow-md"
                onClick={(event) => handleDeleteGoal(event, idx)}
              >
                {value}
                <Image
                  src="/icons/add.png"
                  className="rotate-45"
                  alt="Add icon"
                  width={20}
                  height={20}
                />
              </div>
            );
          })}
        </div>

        <input type="text" placeholder="Enter goal" ref={inputRef} />
        <div className="grid w-full py-4 place-content-end">
          <button className="tile" onClick={handleAddGoal}>
            <Image src="/icons/add.png" width={20} height={20} alt="add icon" />
            Add New Goal
          </button>
        </div>
      </div>
    </div>
  );
}
