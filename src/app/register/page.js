"use client";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button.jsx";
import {
  PersonalInformation,
  FoodCategories,
  Allergies,
  ChronicConditions,
  DailyIntake,
  Accessibility,
} from "../../components/MultiForm.jsx";

import { useRouter, useSearchParams } from "next/navigation";
// authentication for protected routes
import { signIn } from "next-auth/react";

// form validation imports
import { useForm } from "react-hook-form";
import { object, string, date, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaPray } from "react-icons/fa/index.js";

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
  //form validation imports
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  // query parameters
  const queryParams = useSearchParams();
  const formIndex = queryParams.get("formIndex");

  // State variables using the useState hook
  const router = useRouter();
  const [index, setIndex] = !formIndex
    ? useState(0)
    : useState(parseInt(formIndex));
  const [title, setTitle] = useState("Create a new account: ");
  const [otherFormData, setOtherFormData] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [nextButtonOpacity, setNextButtonOpacity] = !formIndex
    ? useState("0")
    : useState("1");

  // if the query is empty then add data to it
  !formIndex && router.replace("/register?formIndex=0");

  // Function to collect additional form data Dietery Restrictions, allergies, chronic conditions, accessibility settings
  const handleCollectData = (data) => {
    setOtherFormData({ ...otherFormData, ...data });
  };
  //loading dialog box
  const loadingRef = useRef(null);
  // show loading while backend is validating
  const showLoadingModal = () => {
    loadingRef.current.showModal();
    return true;
  };
  // for closing the loading
  const closeLoadingModal = () => {
    loadingRef.current.close();
  };

  // Function to handle initial next button click
  const handleInitialNextClick = (formData) => {
    const numberOFSubForms = 5;
    if (index >= numberOFSubForms) {
      return;
    } else if (index >= numberOFSubForms - 1) {
      setTitle("Almost done!");
    }
    setIndex((prevIndex) => prevIndex + 1);
    router.replace(`/register?formIndex=${index + 1}`);
    setNextButtonOpacity("1");
  };
  // Function to handle next button click
  const handleNextClick = (e) => {
    const numberOFSubForms = 5;
    e.preventDefault();
    if (index >= numberOFSubForms) {
      return;
    } else if (index >= numberOFSubForms - 1) {
      setTitle("Almost done!");
    }

    setIndex((prevIndex) => prevIndex + 1);
    router.replace(`/register?formIndex=${index + 1}`);
    setNextButtonOpacity("1");
  };

  // Function to handle previous button click
  const handleClickPrev = (e) => {
    e.preventDefault();
    if (index <= 0) {
      return;
    }
    setTitle("Create a new account");

    setIndex((prevIndex) => prevIndex - 1);
    router.replace(`/register?formIndex=${index - 1}`);
  };

  // Function to handle the final form submission
  const handleFormSubmit = async (data) => {
    data = {
      forename: data.firstName,
      surname: data.lastName,
      dob: data.date.toISOString(),
      email: data.email,
      password: data.password,
      gender: data.gender,
      is_admin: 0,
      registration: true,
    };
    showLoadingModal();
    const result = await signIn("credentials", {
      redirect: false, // Don't redirect, we'll handle that manually
      ...data,
      ...otherFormData, // Pass additional data
    });
    if (result.error) {
      // Handle sign-in error, log error to console
      console.error("Sign-in error:", result.error);
      // alert("unable to login", result.error);
    } else {
      // Sign-in was successful, set success flag and redirect to "/home"
      router.push("/home");
    }
  };

  // Function to handle navigation button click
  const handleNavclick = (event, pos) => {
    event.preventDefault();
    setIndex((index) => index * 0 + pos);
  };

  const resetIndex = (errors) => {
    if (Object.keys(errors).length > 0) {
      setTitle("Create a new account");
      setIndex((prevIndex) => prevIndex * 0);
      // hiding the next form buttons so the user
      // does not visit the next form page until the personal information section is complete i.e (email, pass, dob etc)
      setNextButtonOpacity("0");
    }
  };
  // useEffect to handle changes in errors and submitSuccess states
  useEffect(() => {
    // If there are form errors, reset to the initial step
    resetIndex(errors);
  }, [errors, submitSuccess]);
  return (
    <>
      <dialog
        ref={loadingRef}
        className="bg-none bg-transparent outline-none border-none overflow-hidden min-h-fit min-w-fit"
      >
        <img
          src="/icons/loading.png"
          width={80}
          height={80}
          className="animate-spin "
        />
        <div className="font-semibold">loading...</div>
      </dialog>
      <div className="bg-white absolute inset-0 grid grid-cols-4 text-black font-opensans min-h-screen h-fit sm:grid-cols-1 sm:grid-rows-4">
        <div className="bg-primary flex flex-col justify-center items-center gap-4 pl-4 pr-2 sm:gap-2">
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
          <div
            className="flex justify-center items-center flex-wrap gap-3 transition-all delay-100"
            style={{ opacity: nextButtonOpacity }}
          >
            <button
              className="rounded-xl opacity-80 btn-one"
              onClick={(event) => handleNavclick(event, 0)}
            >
              1
            </button>
            <button
              className="rounded-xl opacity-80 btn-two"
              onClick={(event) => handleNavclick(event, 1)}
            >
              2
            </button>
            <button
              className="rounded-xl opacity-80 btn-three"
              onClick={(event) => handleNavclick(event, 2)}
            >
              3
            </button>
            <button
              className="rounded-xl opacity-80 btn-four"
              onClick={(event) => handleNavclick(event, 3)}
            >
              4
            </button>
            <button
              className="rounded-xl opacity-80 btn-five"
              onClick={(event) => handleNavclick(event, 4)}
            >
              5
            </button>
            <button
              className="rounded-xl opacity-80 btn-six"
              onClick={(event) => handleNavclick(event, 5)}
            >
              6
            </button>
          </div>
          <div className="w-[50%] min-h-fit relative overflow-x-hidden overflow-hidde sm:w-[90%]">
            <form
              id="chageTranslte"
              className="flex transition-transform duration-200 min-h-fit"
              style={{ transform: `translateX(${index * -100}%)` }}
            >
              <PersonalInformation
                onClick={handleInitialNextClick}
                resetIndex={resetIndex}
                formValidation={{
                  register,
                  handleSubmit,
                  formState: { errors },
                }}
              />
              <FoodCategories
                onClick={handleNextClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <Allergies
                onClick={handleNextClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <ChronicConditions
                onClick={handleNextClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <Accessibility
                onClick={handleNextClick}
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
