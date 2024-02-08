"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "./Button.jsx";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function PersonalInformation({
  onClick,
  formValidation,
  resetIndex,
}) {
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
        <div
          className="grid grid-cols-2 place-items-center"
          id="RestrictionsNext"
        >
          <div>
            <Link href={"/"} className="tile px-8 py-3 ">
              Back
            </Link>
          </div>
          <div>
            <Button onClick={handleSubmit(onClick)}>Next</Button>
          </div>
        </div>
      </div>
    </>
  );
}
