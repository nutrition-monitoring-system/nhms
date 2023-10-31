"use client";
import { useEffect, useState } from "react";
//import Image from 'next/image'
import Button from "../../components/Button.jsx";
//import Accessibility from "../../components/Accessibility.jsx";
import {
  PersonalInformation,
  FoodCategories,
  Allergies,
  ChronicConditions,
  DailyIntake,
  Accessibility,
} from "../../components/FormCards.jsx";

import { useRouter } from "next/navigation";

// form validation imports
import { useForm } from "react-hook-form";
import { object, string, date, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = object().shape({
  firstName: string().required("Please type in your First name."),
  lastName: string().required("Please type in your last name."),
  date: date().required("Please type in your date of birth."),
  gender: string().required("Please choose a gender from list of options"),
  email: string().email().required("Please type in your email."),
  password: string().min(10).max(20).required("Please type in your password."),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Passwords must match"
  ),
});

export default function Home() {
  //form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [title, setTitle] = useState("Create A New Account");

  const handleClick = (e) => {
    const numberOFSubForms = 5;
    e.preventDefault();
    if (index >= numberOFSubForms) {
      return;
    } else if (index >= numberOFSubForms - 1) {
      setTitle("Almost Done!");
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  // this functions handle's the previous click button
  const handleClickPrev = (e) => {
    e.preventDefault();
    if (index <= 0) {
      return;
    }
    setTitle("Create A New Account");

    setIndex((prevIndex) => prevIndex - 1);
  };
  const handleFormSubmit = async (data) => {
    data = {
      forename: data.firstName,
      surname: data.lastName,
      dob: data.date,
      email: data.email,
      password: data.password,
      gender: data.gender,
      is_admin: 0
    }
    console.log(data);
    try {
      const url = "https://localhost:3000/addUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const content = await response.json();

      //router.push("/home");
      console.log(content);
    } catch (error) {
      console.error("Could not push to /api/addUSer");
    } finally {
    }
  };

  useEffect(() => {
    setTitle("Create A New Account");
    setIndex((prevIndex) => prevIndex * 0);
  }, [errors]);

  return (
    <>
      <div className="bg-white absolute inset-0 grid grid-cols-4 text-black font-opensans min-h-screen h-fit">
        <div className="bg-primary flex flex-col justify-center items-center gap-4 pl-4 pr-2">
          <h1 className="font-extrabold text-[20px]">Welcome back!</h1>
          <p className="text-center">
            Sign in to unlock a world of nutrition opportunities!
          </p>
          <Button href={"/login"}>Sign In</Button>
        </div>
        <div className="col-span-3 text-black flex flex-col justify-center items-center gap-4">
          <h1 className="font-black text-[20px] font-modak text-center w-1/2 leading-10">
            {title}
          </h1>
          <div className="w-[50%] min-h-fit relative overflow-x-hidden overflow-hidden">
            <form
              className="flex transition-transform duration-200 min-h-fit"
              style={{ transform: `translateX(${index * -100}%)` }}
            >
              <PersonalInformation
                onClick={handleClick}
                formValidation={{
                  register,
                  handleSubmit,
                  formState: { errors },
                }}
              />
              <FoodCategories
                onClick={handleClick}
                onClickPrev={handleClickPrev}
              />
              <Allergies onClick={handleClick} onClickPrev={handleClickPrev} />
              <ChronicConditions
                onClick={handleClick}
                onClickPrev={handleClickPrev}
              />
              <Accessibility
                onClick={handleClick}
                onClickPrev={handleClickPrev}
              />
              <DailyIntake
                onClickPrev={handleClickPrev}
                handleSubmit={handleSubmit(handleFormSubmit)}
              />
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
