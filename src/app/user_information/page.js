"use client"; // This tells Next js that the everycode in this file will be rendered in the client side
import Button from "@/components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "../../utils/otherUtils";

// personal information
export default function Page() {
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
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="grid place-items-center font-black text-[1.5rem]">
        Update personal information
      </h1>
      <div className="flex flex-col justify-center items-left gap-2 w-1/2 xl:w-[30%] p-3 rounded-md">
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
        <div className="flex gap-2 justify-between">
          {/* Displaying the error message*/}
          <p className="text-rose-600 text-sm">{errors.firstName?.message}</p>
          <p className="text-rose-600 text-sm">{errors.lastName?.message}</p>
        </div>
        <div className="relative h-fit py-7 shadow-sm rounded-lg">
          <select
            {...register("gender", { required: "Gender is required" })} //making sure the user types the right datatype
            className="absolute inset-0"
          >
            <option className="opacity-70 font-semibold" value="">
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
        <p className="text-rose-600 text-sm">{errors.gender?.message}</p>{" "}
        {/* Displaying the error message*/}
        <div className="relative flex sm:py-7 shadow-sm rounded-md">
          <input
            placeholder={"Date of Birth*"}
            type={type}
            className="sm:flex-1 sm:absolute sm:inset-0 sm:bg-primarylight"
            onFocus={handleFocus}
            {...register("date")} //making sure the user types the right dataype
          />
        </div>
        {/* Displaying the error message*/}
        <p className="text-rose-600 text-sm">{errors.date?.message}</p>
        <input
          type={"text"}
          placeholder={"New Email Address"}
          {...register("email")} //making sure the user types the right dataype
        />
        {/* Displaying the error message*/}
        <p className="text-rose-600 text-sm">{errors.email?.message}</p>
        <input
          type={"password"}
          placeholder={"New Password"}
          {...register("password")} //making sure the user types the right dataype
        />
        {/* Displaying the error message*/}
        <p className="text-rose-600 text-sm">{errors.password?.message}</p>
        <input
          type={"password"}
          placeholder={"Confirm New Password*"}
          {...register("confirmPassword")} //making sure the user types the right dataype
        />
        <p className="text-rose-600 text-sm">
          {/* Displaying the error message*/}
          {errors.confirmPassword?.message}
        </p>
        <div
          className="w-full flex justify-around itemss-center"
          id="RestrictionsNext"
        >
          <Button>My Profile</Button>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
}
