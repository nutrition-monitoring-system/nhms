"use client";
import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import {
  PersonalInformation,
  FoodCategories,
  Allergies,
  ChronicConditions,
  DailyIntake,
  Accessibility,
} from "../../components/MultiForm.jsx";

import { useRouter } from "next/navigation";

// authentication for protected routes
import { signIn } from "next-auth/react";

// form validation imports
import { useForm } from "react-hook-form";
import { object, string, date, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = object().shape({
  firstName: string().required("Please type in your first name."),
  lastName: string().required("Please type in your last name."),
  date: date().required("Please type in your date of birth."),
  gender: string().required("Please choose your gender. "),
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
  const [title, setTitle] = useState("Create a new account: ");
  const [otherFormData, setOtherFormData] = useState({});

  const handleCollectData = (data) => {
    setOtherFormData({ ...otherFormData, ...data });
  };

  const handleClick = (e) => {
    const numberOFSubForms = 5;
    e.preventDefault();
    if (index >= numberOFSubForms) {
      return;
    } else if (index >= numberOFSubForms - 1) {
      setTitle("Almost done!");
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  // this functions handle's the previous click button
  const handleClickPrev = (e) => {
    e.preventDefault();
    if (index <= 0) {
      return;
    }
    setTitle("Create a new account");

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
      is_admin: 0,
      registration: true,
    };
    const result = await signIn("credentials", {
      redirect: false, // Don't redirect, we'll handle that manually
      ...data,
      ...otherFormData, // Pass data
    });

    if (result.error) {
      // Handle sign-in error, you can display an error message to the user
      console.error("Sign-in error:", result.error);
    } else {
      // Sign-in was successful
      router.push("/home");
    }
  };

  const handleNavclick = (event, pos) => {
    event.preventDefault();
    setIndex((index) => index * 0 + pos);
  };

  useEffect(() => {
    // making sure to only go back if we have  errors
    if (Object.keys(errors).length > 0) {
      setTitle("Create a new account");
      setIndex((prevIndex) => prevIndex * 0);
    }
  }, [errors]);

  return (
    <>
      <div className="bg-white absolute inset-0 grid grid-cols-4 text-black font-opensans min-h-screen h-fit sm:grid-cols-1 sm:grid-rows-4">
        <div className="bg-primary flex flex-col justify-center items-center gap-4 pl-4 pr-2">
          <h1 className="font-extrabold text-[20px]">Welcome back!</h1>
          <p className="text-center">
            Sign in to unlock a world of nutrition opportunities!
          </p>
          <Button href={"/login"}>Login</Button>
        </div>
        <div className="col-span-3 text-black flex flex-col justify-center items-center gap-2 sm:row-span-3">
          <h1 className="font-black text-[20px] font-modak text-center w-1/2 leading-10 sm:w-3/4">
            {title}
          </h1>
          <div className="flex justify-center items-center flex-wrap gap-3">
            <button
              href=""
              className="rounded-xl opacity-80"
              onClick={(event) => handleNavclick(event, 0)}
            >
              1
            </button>
            <button
              href=""
              className="rounded-xl opacity-80"
              onClick={(event) => handleNavclick(event, 1)}
            >
              2
            </button>
            <button
              href=""
              className="rounded-xl opacity-80"
              onClick={(event) => handleNavclick(event, 2)}
            >
              3
            </button>
            <button
              href=""
              className="rounded-xl opacity-80"
              onClick={(event) => handleNavclick(event, 3)}
            >
              4
            </button>
            <button
              href=""
              className="rounded-xl opacity-80"
              onClick={(event) => handleNavclick(event, 4)}
            >
              5
            </button>
            <button
              href=""
              className="rounded-xl opacity-80"
              onClick={(event) => handleNavclick(event, 5)}
            >
              6
            </button>
          </div>
          <div className="w-[50%] min-h-fit relative overflow-x-hidden overflow-hidde sm:w-[90%]">
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
                handleCollectData={handleCollectData}
              />
              <Allergies
                onClick={handleClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <ChronicConditions
                onClick={handleClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <Accessibility
                onClick={handleClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
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
