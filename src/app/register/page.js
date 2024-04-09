"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "../../components/Button.jsx";

// These are multi-stage form components. They are rendered in a carousel manner.
import TermsAndConditions from "@/components/TermsAndConditions.jsx";
import PersonalInformation from "@/components/PersonalInformation.jsx";
import FoodCategories from "@/components/FoodCategories.jsx";
import Allergies from "@/components/Allergies.jsx";
import ChronicConditions from "@/components/ChronicConditions.jsx";
import DailyIntake from "@/components/DailyIntake.jsx";
import Accessibility from "@/components/Accessibility.jsx";

// handles rerouting users
import { useRouter, useSearchParams } from "next/navigation";

// authentication for protected routes
import { SessionProvider, signIn, useSession } from "next-auth/react";

// form validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "../../utils/otherUtils";

export default function Page() {
  // Start point of this page
  // Uses Session to check if the user is logged in or nots
  return (
    <SessionProvider>
      <Home></Home>
    </SessionProvider>
  );
}
function Home() {
  // form validation imports
  // read more of the comments in the login/page.js file
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  // checking the status of the user if they are logged in already or not
  const { status } = useSession();

  // query parameters - Example - https://website.com/register?formIndex=0
  // formIndex is the index of the form that the user is on.
  const queryParams = useSearchParams();
  const formIndex = queryParams.get("formIndex");

  // State variables using the useState hook
  const router = useRouter();
  // we use formIndex to determine what Carousel component needs to be rerendered at the moment
  const [index, setIndex] = !formIndex
    ? useState(0)
    : useState(parseInt(formIndex));
  // if the user is almost at the end of the registration process then we show "Almost Done" else we show "Create a new account"
  const [title, setTitle] = useState("Create a new account: ");
  const [otherFormData, setOtherFormData] = useState({});
  const [nextButtonOpacity, setNextButtonOpacity] =
    parseInt(formIndex) <= 0 ? useState("0") : useState("1");

  // if the query is empty then add data to it
  useEffect(() => {
    !formIndex && router.replace("/register?formIndex=0");
  }, []);

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
    // we set the form index to index + 1 and if the index is greater than total number of carousel components
    // then we do not do anything.
    const numberOFSubForms = 6;
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
  const handleNextClick = (event) => {
    const numberOFSubForms = 6;

    event?.preventDefault && event.preventDefault();
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
    // we set the form index to index + 1 and if the index is less than 0 of carousel components
    // then we do not do anything.
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
    // This gets data from the useForm API then send it to the backend when the user creates a new account
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
      const error = JSON.parse(result.error); // convert from json to javascript object
      if (error.message === "Email already used.") {
        alert("Email already used. SignIn instead");
        closeLoadingModal();
      }
      // alert("unable to login", result.error);
    } else {
      // Sign-in was successful, set success flag and redirect to "/home"
      router.push("/home");
    }
  };

  // Function to handle navigation button click
  const handleNavClick = (event, pos) => {
    event.preventDefault();
    setIndex((index) => index * 0 + pos);
    router.replace(`/register?formIndex=${pos}`);
  };

  const resetIndex = (errors) => {
    if (Object.keys(errors).length > 0) {
      setTitle("Create a new account");
      setIndex((prevIndex) => prevIndex * 0 + 1);
      // hiding the next form buttons so the user
      // does not visit the next form page until the personal information section is complete i.e (email, pass, dob etc)
      setNextButtonOpacity("0");
    }
  };
  // useEffect to handle changes in errors and submitSuccess states
  useEffect(() => {
    // If there are form errors, reset to the initial step
    resetIndex(errors);
  }, [errors]);

  useEffect(() => {
    // if the user is already authenticated, redirect to the home page.
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);
  return (
    <>
      <dialog
        ref={loadingRef}
        className="overflow-hidden bg-transparent border-none outline-none bg-none min-h-fit min-w-fit"
      >
        <Image
          src="/icons/loading.png"
          width={80}
          height={80}
          className="animate-spin"
          alt="loading spinner"
        />
        <div className="font-semibold">loading...</div>
      </dialog>
      <div className="absolute inset-0 grid min-h-screen grid-cols-4 text-black bg-white font-opensans h-fit sm:grid-cols-1 sm:grid-rows-4">
        <div className="flex flex-col items-center justify-center gap-4 pl-4 pr-2 bg-primary sm:gap-2">
          <h1 className="font-extrabold text-[20px]">Welcome back!</h1>
          <p className="text-center">
            Sign in to unlock a world of nutrition opportunities!
          </p>
          <Button href={"/login"}>Login</Button>
        </div>
        <div className="flex flex-col items-center justify-center col-span-3 gap-2 text-black sm:row-span-3">
          <h1 className="font-black text-[20px] font-modak text-center w-1/2 leading-10 sm:w-3/4">
            {title}
          </h1>
          <ButtonArray
            handleNavClick={handleNavClick}
            nextButtonOpacity={nextButtonOpacity}
          />

          <div className="w-[55%] xl:w-[40%] min-h-fit relative overflow-x-hidden overflow-hidde sm:w-[90%]">
            <form
              id="chageTranslte"
              className="flex transition-transform duration-200 min-h-fit"
              style={{ transform: `translateX(${index * -100}%)` }}
            >
              <TermsAndConditions
                onClickNext={handleInitialNextClick}
                onClickPrev={handleClickPrev}
              />
              <PersonalInformation
                onClick={handleNextClick}
                onClickPrev={handleClickPrev}
                resetIndex={resetIndex}
                formValidation={{
                  register,
                  handleSubmit,
                  formState: { errors },
                }}
              />
              <FoodCategories
                onClickNext={handleNextClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <Allergies
                onClickNext={handleNextClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <ChronicConditions
                onClickNext={handleNextClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <Accessibility
                onClickNext={handleNextClick}
                onClickPrev={handleClickPrev}
                handleCollectData={handleCollectData}
              />
              <DailyIntake
                onClickNext={handleSubmit(handleFormSubmit)}
                onClickPrev={handleClickPrev}
              />
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

function ButtonArray({ handleNavClick, nextButtonOpacity }) {
  // These buttons are another way of quickly changing the form index
  //
  return (
    <>
      <div
        className="flex flex-wrap items-center justify-center gap-3 transition-all delay-100"
        style={{ opacity: nextButtonOpacity }}
      >
        <button
          className="rounded-xl opacity-80 hover:font-bold"
          onClick={(event) => handleNavClick(event, 0)}
        >
          1
        </button>
        <button
          className="rounded-xl opacity-80 hover:font-bold"
          onClick={(event) => handleNavClick(event, 1)}
        >
          2
        </button>
        <button
          className="rounded-xl opacity-80 hover:font-bold"
          onClick={(event) => handleNavClick(event, 2)}
        >
          3
        </button>
        <button
          className="rounded-xl opacity-80 hover:font-bold"
          onClick={(event) => handleNavClick(event, 3)}
        >
          4
        </button>
        <button
          className="rounded-xl opacity-80 hover:font-bold"
          onClick={(event) => handleNavClick(event, 4)}
        >
          5
        </button>
        <button
          className="rounded-xl opacity-80 hover:font-bold"
          onClick={(event) => handleNavClick(event, 5)}
        >
          6
        </button>
        <button
          className="rounded-xl opacity-80"
          onClick={(event) => handleNavClick(event, 6)}
        >
          7
        </button>
      </div>
    </>
  );
}
