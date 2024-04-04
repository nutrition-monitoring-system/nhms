"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "../utils/otherUtils";

// personal information
export default function UserInformation() {
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
  } = useForm({ resolver: yupResolver(userSchema) });

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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="grid place-items-center font-black text-[1.5rem]">
        Update personal information
      </h1>
      <div className="flex flex-col justify-center gap-2 p-3 rounded-md items-left">
        <div className="flex gap-2">
          <input
            type={"text"}
            placeholder={"Update first Name"}
            id="name"
            {...register("firstName")}
          />
          <input
            type={"text"}
            placeholder={"Update last Name"}
            {...register("lastName")}
          />
        </div>
        <div className="flex justify-between gap-2">
          {/* Displaying the error message*/}
          <p className="text-sm text-rose-600">{errors.firstName?.message}</p>
          <p className="text-sm text-rose-600">{errors.lastName?.message}</p>
        </div>
        <div className="relative rounded-lg shadow-sm h-fit py-7">
          <select
            {...register("gender", { required: "Gender is required" })} //making sure the user types the right datatype
            className="absolute inset-0"
          >
            <option className="font-semibold opacity-70" value="">
              Change your gender
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
        <p className="text-sm text-rose-600">{errors.gender?.message}</p>{" "}
        {/* Displaying the error message*/}
        <div className="relative flex rounded-md shadow-sm sm:py-7">
          <input
            placeholder={"Date of Birth*"}
            type={type}
            className="sm:flex-1 sm:absolute sm:inset-0 sm:bg-primarylight"
            onFocus={handleFocus}
            {...register("date")} //making sure the user types the right dataype
          />
        </div>
        {/* Displaying the error message*/}
        <p className="text-sm text-rose-600">{errors.date?.message}</p>
        <input
          type={"text"}
          placeholder={"New Email Address"}
          {...register("email")} //making sure the user types the right dataype
        />
        {/* Displaying the error message*/}
        <p className="text-sm text-rose-600">{errors.email?.message}</p>
        <input
          type={"password"}
          placeholder={"New Password"}
          {...register("password")} //making sure the user types the right dataype
        />
        {/* Displaying the error message*/}
        <p className="text-sm text-rose-600">{errors.password?.message}</p>
        <input
          type={"password"}
          placeholder={"Confirm New Password*"}
          {...register("confirmPassword")} //making sure the user types the right dataype
        />
        <p className="text-sm text-rose-600">
          {/* Displaying the error message*/}
          {errors.confirmPassword?.message}
        </p>
        <div
          className="flex justify-around w-full itemss-center"
          id="RestrictionsNext"
        >
          <button className="tile">My Profile</button>
          <button className="tile" onClick={() => {}}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
